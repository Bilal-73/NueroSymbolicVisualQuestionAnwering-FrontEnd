

import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { speakText, removeTtsListener } from "./Screens/Services/TextToSpeech";
import { listenForWakeWord } from "./Screens/Services/WakeWordDetection";

export default function StartScreen({ navigation }) {
  const isListening = useRef(false);
  const ttsSpeaking = useRef(false);

  // ---------------- INIT WHEN SCREEN FOCUSED ----------------
  useFocusEffect(
    useCallback(() => {
      ttsSpeaking.current = true;
      speakText(
        "Welcome to See For Me. Say start to continue.",
        () => {
          ttsSpeaking.current = false;
          startListening();
        }
      );

      return () => {
        removeTtsListener();
      };
    }, [])
  );

  // ---------------- START LISTENING ----------------
  const startListening = async () => {
    if (isListening.current || ttsSpeaking.current) return;

    isListening.current = true;
    const command = await listenForWakeWord(4000); // max 4 sec for wake word
    isListening.current = false;

    console.log("Detected command:", command);

    if (command && command.toLowerCase() === "start") {
      ttsSpeaking.current = true;
      speakText("Starting blind mode", () => {
        ttsSpeaking.current = false;
        navigation.navigate("MainPorc");
      });
    } else {
      // Retry automatically after 500ms
      setTimeout(startListening, 500);
    }
  };

  // ---------------- UI ----------------
  return (
    <View style={styles.container}>
      <Image source={require("./logos/logo.png")} style={styles.logo} />
      <Text style={styles.title}>SEEFORME</Text>
      <Text style={styles.subtitle}>
        AI that sees, reasons{'\n'}and explains
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Image
        source={require("./logos/microphone.png")}
        style={styles.microphone}
      />
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2D5C6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  logo: {
    width: 200,
    height: 130,
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10
  },
  loginButton: {
    backgroundColor: "#000",
    width: 180,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
    elevation: 3
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  microphone: {
    width: 110,
    height: 110,
    marginTop: 40
  }
});
