

// import React, { useEffect, useState } from 'react';
// import { 
//   View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert 
// } from 'react-native';
// import { launchImageLibrary } from "react-native-image-picker";
// import axios from "axios";
// import CONFIG from "../ipconfig"; 
// import Tts from 'react-native-tts';

// export default function BlindScreen() {
//   const [blindId, setBlindId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [answer, setAnswer] = useState("");
  
//   useEffect(() => {
//     Tts.stop(); 
//     Tts.speak(
//       "Welcome to the app. Say Hey Siri to activate the question answering feature, and stop for three seconds to deactivate it."
//     );

//     setAnswer("");
//   }, []);

//   const pickImage = async () => {
//     const result = await launchImageLibrary({ mediaType: "photo" });
//     if (!result.didCancel && result.assets && result.assets[0].uri) {
//       setSelectedImage(result.assets[0]);
//     }
//   };

//   // const handleAskQuestion = async () => {
//   //   if (!blindId || !question || !selectedImage) {
//   //     Alert.alert("Error", "Please provide Blind ID, question, and an image.");
//   //     return;
//   //   }

//   //   Tts.stop(); 
//   //   Tts.speak(" Processing your question, please wait.");

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("question", question);
//   //     formData.append("image", {
//   //       uri: selectedImage.uri,
//   //       name: selectedImage.fileName || "upload.jpg",
//   //       type: selectedImage.type || "image/jpeg",
//   //     });

//   //     const res = await axios.post(
//   //       `${CONFIG.LAN}/answers/getanswer/${blindId}`,
//   //       formData,
//   //       { headers: { "Content-Type": "multipart/form-data" } }
//   //     );

       
//   //         Tts.speak(" Answer received. Here is the answer. ");
         
      



//   //         setAnswer(res.data.answer || "No answer received.");
//   //         Tts.speak(answer);
//   //   } catch (err) {
//   //     console.error(err);
//   //     Alert.alert("Error", "Failed to fetch answer from server.");
//   //   }
//   // };

//   const handleAskQuestion = async () => {
//   if (!blindId || !question || !selectedImage) {
//     Alert.alert("Error", "Please provide Blind ID, question, and an image.");
//     return;
//   }

//   Tts.stop();
//   Tts.speak("Processing your question, please wait.");

//   try {
//     const formData = new FormData();
//     formData.append("question", question);
//     formData.append("image", {
//       uri: selectedImage.uri,
//       name: selectedImage.fileName || "upload.jpg",
//       type: selectedImage.type || "image/jpeg",
//     });

//     const res = await axios.post(
//       `${CONFIG.LAN}/answers/getanswer/${blindId}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     Tts.stop();
//     // Tts.speak("Answer received. Here is the answer.");

//     const responseAnswer = res.data.answer || "No answer received.";
//     setAnswer(responseAnswer);

//     Tts.speak(responseAnswer); // ✅ now works

//   } catch (err) {
//     console.error(err);
//     Alert.alert("Error", "Failed to fetch answer from server.");
//     Tts.speak("Sorry, I could not get the answer.");
//   }
// };

//   return (
//     <View style={styles.container}> 

//       <Text style={styles.welcome}>Welcome Blind User</Text>

//       {/* Image box */}
//       <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
//         ) : (
//           <Text style={{ color: "#888" }}>Tap to select image</Text>
//         )}
//       </TouchableOpacity>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Blind ID"
//         value={blindId}
//         onChangeText={setBlindId}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your question"
//         value={question}
//         onChangeText={setQuestion}
//       />

//       {/* Answer */}
//       {answer ? <Text style={styles.answer}>A: {answer}</Text> : null}

//       {/* Ask Button */}
//       <TouchableOpacity 
//         style={styles.askButton}
//         onPress={handleAskQuestion}
//       >
//         <Text style={styles.askButtonText}>Ask Question</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   welcome: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 20 },

//   imageBox: {
//     width: "90%",
//     height: 250,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     elevation: 4,
//   },

//   previewImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 15,
//   },

//   input: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 2,
//   },

//   answer: { fontSize: 18, color: "#333", marginBottom: 20 },

//   askButton: {
//     backgroundColor: "#0077B6",
//     paddingVertical: 15,
//     paddingHorizontal: 35,
//     borderRadius: 12,
//     elevation: 3,
//   },

//   askButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });




// import React, { useEffect, useState } from 'react';
// import { 
//   View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert, ScrollView 
// } from 'react-native';
// import { launchImageLibrary } from "react-native-image-picker";
// import axios from "axios";
// import CONFIG from "../ipconfig"; 
// import Tts from 'react-native-tts';

// export default function BlindScreen() {
//   const [blindId, setBlindId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [answer, setAnswer] = useState("");
//   const [detections, setDetections] = useState([]);
//   const [sceneGraph, setSceneGraph] = useState([]);
//   const [processedImageUrl, setProcessedImageUrl] = useState("");

//   useEffect(() => {
//     Tts.stop(); 
//     Tts.speak(
//       "Welcome to the app. Say Hey Siri to activate the question answering feature, and stop for three seconds to deactivate it."
//     );
//     setAnswer("");
//   }, []);

//   const pickImage = async () => {
//     const result = await launchImageLibrary({ mediaType: "photo" });
//     if (!result.didCancel && result.assets && result.assets[0].uri) {
//       setSelectedImage(result.assets[0]);
//     }
//   };

//   const handleAskQuestion = async () => {
//     if (!blindId || !question || !selectedImage) {
//       Alert.alert("Error", "Please provide Blind ID, question, and an image.");
//       return;
//     }

//     Tts.stop();
//     Tts.speak("Processing your question, please wait.");

//     try {
//       const formData = new FormData();
//       formData.append("question", question);
//       formData.append("image", {
//         uri: selectedImage.uri,
//         name: selectedImage.fileName || "upload.jpg",
//         type: selectedImage.type || "image/jpeg",
//       });

//       const res = await axios.post(
//         `${CONFIG.LAN}/answers/getanswer/${blindId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       Tts.stop();

//       const responseAnswer = res.data.answer || "No answer received.";
//       setAnswer(responseAnswer);
//       Tts.speak(responseAnswer);

//       // Set detections, scene graph and processed image
//       setDetections(res.data.detections || []);
//       setSceneGraph(res.data.scene_graph || []);
      
//       setProcessedImageUrl(res.data.image_url || "");
//       console.log("Final Image URL:", `${CONFIG.LAN}${processedImageUrl}`);


//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Failed to fetch answer from server.");
//       Tts.speak("Sorry, I could not get the answer.");
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
//       <Text style={styles.welcome}>Welcome Blind User</Text>

//       {/* Original image */}
//       <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
//         ) : (
//           <Text style={{ color: "#888" }}>Tap to select image</Text>
//         )}
//       </TouchableOpacity>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Blind ID"
//         value={blindId}
//         onChangeText={setBlindId}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your question"
//         value={question}
//         onChangeText={setQuestion}
//       />

//       <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
//         <Text style={styles.askButtonText}>Ask Question</Text>
//       </TouchableOpacity>

//       {/* Answer */}
//       {answer ? <Text style={styles.answer}>A: {answer}</Text> : null}

//       {/* Processed image with detections */}
//       {/* Processed image */}
//       {processedImageUrl ? (
//         <View style={{ width: "90%", marginVertical: 15 }}>
//           <Text style={styles.sectionTitle}>Processed Image {CONFIG.LAN}{processedImageUrl}</Text>

//           <Image
//             source={{
//               uri: `${CONFIG.LAN}/${processedImageUrl}`
//             }}
//             style={styles.processedImage}
//           />
//         </View>
//       ) : <Text style={styles.sectionTitle}>Processed Image {CONFIG.LAN}{processedImageUrl}</Text>}



//       {/* Object Detections */}
//       {detections.length > 0 && (
//         <View style={{ width: "90%", marginVertical: 15 }}>
//           <Text style={styles.sectionTitle}>Object Detections:</Text>
//           {detections.map((obj, index) => (
//             <View key={index} style={styles.detectionBox}>
//               <Text style={styles.detectionLabel}>Object: {obj.label}</Text>
//               <Text>BBox: {JSON.stringify(obj.bbox)}</Text>
//               <Text>Color: {obj.color}</Text>
//               <Text>Shape: {obj.shape}</Text>
//               <Text>Emotion: {obj.emotion}</Text>
//             </View>
//           ))}
//         </View>
//       )}

//       {/* Scene Graph */}
//       {sceneGraph.length > 0 && (
//         <View style={{ width: "90%", marginVertical: 15 }}>
//           <Text style={styles.sectionTitle}>Scene Graph (Triplets):</Text>
//           {sceneGraph.map((rel, index) => (
//             <Text key={index} style={styles.triplet}>
//               {rel.from} — {rel.relation} → {rel.to}
//             </Text>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//   },
//   welcome: { fontSize: 22, fontWeight: 'bold', color: '#000', marginVertical: 20, textAlign: 'center' },
//   imageBox: {
//     width: "90%",
//     height: 250,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     elevation: 4,
//   },
//   previewImage: { width: "100%", height: "100%", borderRadius: 15 },
//   input: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 2,
//   },
//   askButton: {
//     backgroundColor: "#0077B6",
//     paddingVertical: 15,
//     paddingHorizontal: 35,
//     borderRadius: 12,
//     elevation: 3,
//     marginBottom: 15,
//   },
//   askButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
//   answer: { fontSize: 18, color: "#333", marginVertical: 10 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   processedImage: { width: "100%", height: 300, borderRadius: 12, resizeMode: "contain" },
//   detectionBox: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 8, elevation: 2 },
//   detectionLabel: { fontWeight: "bold" },
//   triplet: { fontSize: 16, marginVertical: 2 },
// });


import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AudioRecord from "react-native-audio-record";
import Tts from "react-native-tts";
import axios from "axios";
import CONFIG from "../../ipconfig";

export default function BlindScreen() {
  const [blindId, setBlindId] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [detections, setDetections] = useState([]);
  const [sceneGraph, setSceneGraph] = useState([]);
  const [processedImageUrl, setProcessedImageUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const audioPathRef = useRef("");

  /* -------------------- TTS INIT -------------------- */
  useEffect(() => {
    Tts.stop();
    Tts.setDefaultRate(0.45);
    Tts.setDefaultPitch(1.0);
    Tts.speak(
      "Welcome. Developer mode. You can ask questions via text or voice."
    );
  }, []);

  /* -------------------- PERMISSIONS -------------------- */
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === "granted" &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === "granted" &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          "granted" &&
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          "granted"
      );
    }
    return true;
  };

  /* -------------------- IMAGE PICKER -------------------- */
  const pickFromGallery = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (!result.didCancel && result.assets?.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };

  const pickFromCamera = async () => {
    const ok = await requestPermissions();
    if (!ok) return Alert.alert("Permissions required");

    const result = await launchCamera({ mediaType: "photo" });
    if (!result.didCancel && result.assets?.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };

  /* -------------------- TEXT MODE -------------------- */
  const handleAskTextQuestion = async () => {
    if (!blindId || !question || !selectedImage) {
      Alert.alert("Missing Info", "Blind ID, image, and question required");
      return;
    }

    try {
      Tts.stop();
      Tts.speak("Processing your question. Please wait.");

      const formData = new FormData();
      formData.append("question", question);
      formData.append("image", {
        uri: selectedImage.uri,
        name: selectedImage.fileName || "image.jpg",
        type: selectedImage.type || "image/jpeg",
      });

      const res = await axios.post(
        `${CONFIG.LAN}/answers/getanswer/${blindId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const finalAnswer = res.data.answer || "No answer received";

      setAnswer(finalAnswer);
      setDetections(res.data.detections || []);
      setSceneGraph(res.data.scene_graph || []);
      setProcessedImageUrl(res.data.image_url || "");

      Tts.stop();
      Tts.speak(finalAnswer);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to get answer");
      Tts.speak("Sorry, something went wrong.");
    }
  };

  /* -------------------- AUDIO MODE -------------------- */
  const startRecording = async () => {
    const ok = await requestPermissions();
    if (!ok) return Alert.alert("Permissions required");

    AudioRecord.init({
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "question.wav",
    });

    setRecording(true);
    AudioRecord.start();
  };

  const stopRecording = async () => {
    const audioFile = await AudioRecord.stop();
    setRecording(false);
    audioPathRef.current = Platform.OS === "android" ? "file://" + audioFile : audioFile;
    handleAudioQuestion(audioPathRef.current);
  };

  const handleAudioQuestion = async (filePath) => {
    if (!blindId || !selectedImage) {
      Alert.alert("Missing Info", "Blind ID and image required");
      return;
    }

    try {
      Tts.stop();
      Tts.speak("Transcribing your audio, please wait.");

      const audioForm = new FormData();
      audioForm.append("audio", {
        uri: filePath,
        type: "audio/wav",
        name: "question.wav",
      });

      // Transcribe
      const tRes = await axios.post(`${CONFIG.LAN}/audio/transcribe`, audioForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const transcribedText = tRes?.data?.text || "";
      setTranscription(transcribedText);

      if (!transcribedText) return;

      Tts.speak("Got your question. Processing the answer.");

      const formData = new FormData();
      formData.append("question", transcribedText);
      formData.append("image", {
        uri: selectedImage.uri,
        name: selectedImage.fileName || "image.jpg",
        type: selectedImage.type || "image/jpeg",
      });

      const res = await axios.post(
        `${CONFIG.LAN}/answers/getanswer/${blindId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const finalAnswer = res.data.answer || "No answer received";
      setAnswer(finalAnswer);
      setDetections(res.data.detections || []);
      setSceneGraph(res.data.scene_graph || []);
      setProcessedImageUrl(res.data.image_url || "");

      Tts.speak(finalAnswer);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to get answer from audio");
      Tts.speak("Sorry, something went wrong.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <Text style={styles.title}>Blind Assistant (Dev Mode)</Text>

      {/* IMAGE PICKER */}
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickFromCamera}>
          <Text style={styles.imageButtonText}>📸 Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={pickFromGallery}>
          <Text style={styles.imageButtonText}>🖼️ Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE DISPLAY */}
      <View style={styles.imageBox}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.previewImage}
          />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
      </View>

      {/* BLIND ID INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Enter Blind ID"
        value={blindId}
        onChangeText={setBlindId}
        keyboardType="numeric"
      />

      {/* TEXT QUESTION */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <TouchableOpacity style={styles.askButton} onPress={handleAskTextQuestion}>
        <Text style={styles.askButtonText}>Ask (Text)</Text>
      </TouchableOpacity>

      {/* AUDIO QUESTION */}
      <TouchableOpacity
        style={[styles.askButton, { backgroundColor: recording ? "#EF4444" : "#2563EB" }]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.askButtonText}>
          {recording ? "Stop Recording" : "Ask (Voice)"}
        </Text>
      </TouchableOpacity>

      {/* TRANSCRIPTION */}
      {transcription !== "" && (
        <View style={styles.answerBox}>
          <Text style={styles.sectionTitle}>Your Transcription</Text>
          <Text style={styles.answerText}>{transcription}</Text>
        </View>
      )}

      {/* ANSWER */}
      {answer !== "" && (
        <View style={styles.answerBox}>
          <Text style={styles.sectionTitle}>Assistant Answer</Text>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}

      {/* PROCESSED IMAGE */}
      {processedImageUrl !== "" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processed Image</Text>
          <Image
            source={{ uri: `${CONFIG.LAN}/${processedImageUrl}` }}
            style={styles.processedImage}
          />
        </View>
      )}

      {/* DETECTIONS */}
      {detections.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Object Detections</Text>
          {detections.map((obj, index) => (
            <View key={index} style={styles.detectionBox}>
              <Text style={styles.bold}>Object: {obj.label}</Text>
              <Text>BBox: {JSON.stringify(obj.bbox)}</Text>
              <Text>Color: {obj.color}</Text>
              <Text>Shape: {obj.shape}</Text>
              <Text>Emotion: {obj.emotion}</Text>
            </View>
          ))}
        </View>
      )}

      {/* SCENE GRAPH */}
      {sceneGraph.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scene Graph</Text>
          {sceneGraph.map((rel, index) => (
            <Text key={index} style={styles.triplet}>
              {rel.from} — {rel.relation} → {rel.to}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#A2D5C6" },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 20 },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: "#0077B6",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  imageButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  imageBox: {
    width: "90%",
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 4,
  },
  previewImage: { width: "100%", height: "100%", borderRadius: 15 },
  placeholder: { color: "#888", fontSize: 16 },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  askButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
  },
  askButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  answerBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  answerText: { fontSize: 16, color: "#333" },
  section: { width: "90%", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  processedImage: { width: "100%", height: 280, borderRadius: 12, resizeMode: "contain" },
  detectionBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  bold: { fontWeight: "bold" },
  triplet: { fontSize: 16, marginVertical: 2 },
});

