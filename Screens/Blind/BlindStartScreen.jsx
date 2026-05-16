


import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

import { recordAudioUntilSilence } from "../Services/AudioRecording";
import { pickImagesFromGallery, takePhotoFromCamera } from "../Services/ImagePicker";
import { speakText, removeTtsListener } from "../Services/TextToSpeech";
import { listenForWakeWord } from "../Services/WakeWordDetection";
import AutoCamera from "../Services/AutoCamera";

import { getAnswerAPI, transcribeAudioAPI } from "../Apis";
import { requestAllPermissions } from "../Services/Permissions";

export default function MainBlindScreen({ navigation }) {
  const BLIND_ID = 1;
  const isListening = useRef(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [answer, setAnswer] = useState("");
  const [recording, setRecording] = useState(false);
  
  
  const captureCallbackRef = useRef(null);
  const selectedImageRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);



  const processQuestionWithImage = async (img) => {
      setRecording(true);
      console.log("[Audio] Recording started...");
      const audioUri = await recordAudioUntilSilence();
      setRecording(false);

      if (!audioUri) return startWakeWordListening();

      try {
        const audioForm = new FormData();
        audioForm.append("audio", {
          uri: audioUri,
          type: "audio/wav",
          name: "question.wav",
        });

        console.log("[Transcription] Sending audio...");
        const tRes = await transcribeAudioAPI(audioForm);
        const question = tRes?.data?.text;

        if (!question) return startWakeWordListening();

        setTranscription(question);

        const answerForm = new FormData();
        answerForm.append("question", question);
        answerForm.append("image", {
          uri: img.uri,
          type: img.type,
          name: img.fileName || "image.jpg",
        });

        console.log("[Answer] Sending question + image...");
        const ansRes = await getAnswerAPI(BLIND_ID, answerForm);
        const finalAns = ansRes?.data?.answer || "Incorrect";

        if (finalAns === "Incorrect") {
          speakText("Question You Provide is Incorrect , Please say continue ", processQuestionWithImage(img));
          return;
        }

        setAnswer(finalAns);
        speakText(finalAns, startWakeWordListening);
      } catch (e) {
        console.log("[ProcessQuestion] Error:", e);
        startWakeWordListening();
  }
  };
  // ---------------- CAPTURE IMAGE ----------------
  const captureImage = async () => {
    const img = await takePhotoFromCamera();
    if (img) {
      setSelectedImage(img);
      selectedImageRef.current = img;
    }
    return img;
  };
  const captureImageAuto = () => {
    console.log("[Camera] Auto capture started");
    return new Promise((resolve) => {
      setShowCamera(true);

      const onCaptured = (img) => {
        console.log("[Camera] Image captured:", img?.uri);
        setShowCamera(false);

        if (img) {
          setSelectedImage(img);
          selectedImageRef.current = img;
        }

        resolve(img);
      };

      captureCallbackRef.current = onCaptured;
    });
  };
  // ---------------- HANDLE COMMAND ----------------
  const handleCommand = async (command) => {
    console.log("[Command] Received command:", command);
    if (!command) return startWakeWordListening();

    switch (command.toLowerCase()) {
      case "ask": {
        console.log("[Command] Ask flow started");
        let img = selectedImage || (await captureImageAuto());
        console.log("[Command] Using image:", img?.uri);
        if (!img) return startWakeWordListening();

        setRecording(true);
        console.log("[Audio] Recording started...");
        const audioUri = await recordAudioUntilSilence();
        console.log("[Audio] Recording stopped, audioUri:", audioUri);
        setRecording(false);

        if (!audioUri) return startWakeWordListening();

        try {
          console.log("[Transcription] Sending audio for transcription...");
          const audioForm = new FormData();
          audioForm.append("audio", { uri: audioUri, type: "audio/wav", name: "question.wav" });
          const tRes = await transcribeAudioAPI(audioForm);
          const question = tRes?.data?.text;
          console.log("[Transcription] Received text:", question);
          if (!question) return startWakeWordListening();

          setTranscription(question);

          console.log("[Answer] Sending question + image to API...");
          const answerForm = new FormData();
          answerForm.append("question", question);
          answerForm.append("image", { uri: img.uri, type: img.type, name: img.fileName || "image.jpg" });
          const ansRes = await getAnswerAPI(BLIND_ID, answerForm);
          const finalAns = ansRes?.data?.answer || "Incorrect";

          if (finalAns === "Incorrect") {
            console.log("[Answer] API returned 'Incorrect'");
            speakText("I am sorry, I could not process your request. Please Record Your Question again.",
               () => processQuestionWithImage(img));
            return;
          }

          console.log("[Answer] Received answer:", finalAns);
          setAnswer(finalAns);

          speakText(finalAns, startWakeWordListening);
        } catch (e) {
          console.log("[Ask Flow] Error:", e);
          startWakeWordListening();
        }
        break;
      }

      case "continue": {
        console.log("[Command] Continue flow started");

        const img = selectedImageRef.current;

        if (!img) {
          speakText(
            "No image is available. Please say ask to capture an image first.",
            () => startWakeWordListening()
          );
          return;
        }

        await processQuestionWithImage(img);
        break;
      }

      case "back":
      {
        speakText(
          "Going Back to Main Screen",
          () => {navigation.navigate("Home")}
        );

      }
      case "temporal":
        {
          speakText("Navigating to Temporal screen.", 
            () => 
              {
            navigation.navigate("temporal")
        });
      }
        
      
    }
  }
    // ---------------- WAKE WORD LISTENING ----------------
  const startWakeWordListening = async () => {
    if (isListening.current) {
      console.log("[WakeWord] Already listening, returning...");
      return;
    }

    isListening.current = true;
    console.log("[WakeWord] Listening for wake word...");

    try {
      const command = await listenForWakeWord();
      console.log("[WakeWord] Detected command:", command);
      isListening.current = false;
      handleCommand(command);
    } catch (err) {
      console.log("[WakeWord] Error:", err);
      isListening.current = false;
    }
  };


  // ---------------- INIT ----------------
  // useEffect(() => {
  //   await requestAllPermissions();
  //   setTimeout(() => {
  //     speakText("Welcome to Main screen", startWakeWordListening);
  //   }, 500);

  //   return () => {
  //     removeTtsListener();
  //   };
  // }, []);

  useEffect(() => {
    const init = async () => {
      console.log("[Init] Requesting permissions...");
      const ok = await requestAllPermissions();
      if (!ok) {
        console.log("[Init] Permissions not granted");
        return;
      }
      console.log("[Init] Permissions granted");

      setTimeout(() => {
        console.log("[Init] Speaking welcome text...");
        speakText("Welcome to Main screen", startWakeWordListening);
      }, 500);
    };

  init();

  return () => {
    console.log("[Cleanup] Removing TTS listener");
    removeTtsListener();
  };
}, []);



  // ---------------- UI ----------------
  return (
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topArea}>
          <TouchableOpacity style={styles.sideButton} onPress={() => handleCommand("back")}>
            <Text style={styles.sideButtonText}>Back</Text>
          </TouchableOpacity>

          <Image source={require("../../logos/logo.png")} style={styles.topLogo} resizeMode="contain" />

          <TouchableOpacity style={styles.sideButton} onPress={() => handleCommand("temporal")}>
            <Text style={styles.sideButtonText}>Temporal</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Blind Assistant</Text>
{showCamera && (
  <View style={{ width: "100%", height: 400, marginBottom: 16, backgroundColor: "#000" }}>
    <AutoCamera
      onCaptured={(img) => {
        console.log("[UI] AutoCamera returned image:", img?.uri);
        captureCallbackRef.current?.(img);
      }}
    />
  </View>
)}


        {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.image} />}

        {transcription && (
          <View style={styles.transcriptionBox}>
            <Text style={styles.boxHeading}>🗣 You Asked</Text>
            <Text style={styles.boxText}>{transcription}</Text>
          </View>
        )}

        {answer && (
          <View style={styles.answerBox}>
            <Text style={styles.boxHeading}>🤖 Assistant Answer</Text>
            <Text style={styles.boxText}>{answer}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.micWrapper} onPress={startWakeWordListening}>
          <Image source={require("../../logos/microphone.png")} style={[styles.mic, recording && styles.micActive]} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#A2D5C6", alignItems: "center", paddingTop: 20 },
  scrollContent: { alignItems: "center", paddingBottom: 40 },
  micWrapper: { marginTop: 20, marginBottom: 30, alignItems: "center" },
  topArea: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 10 },
  sideButton: { backgroundColor: "#E0E7FF", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12 },
  sideButtonText: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
  topLogo: { width: 120, height: 120 },
  title: { fontSize: 26, fontWeight: "800", color: "#0F172A", marginBottom: 16 },
  image: { width: 280, height: 280, borderRadius: 18, marginBottom: 16, backgroundColor: "#E5E7EB" },
  transcriptionBox: { width: "90%", backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, marginBottom: 14 },
  answerBox: { width: "90%", backgroundColor: "#ECFDF5", borderRadius: 16, padding: 18, marginBottom: 20 },
  boxHeading: { fontSize: 14, fontWeight: "800", color: "#475569", marginBottom: 8, letterSpacing: 0.6, textTransform: "uppercase" },
  boxText: { fontSize: 17, lineHeight: 24, fontWeight: "500", color: "#0F172A" },
  mic: { width: 90, height: 90, tintColor: "#2563EB" },
  micActive: { tintColor: "#EF4444", transform: [{ scale: 1.15 }] },
});
