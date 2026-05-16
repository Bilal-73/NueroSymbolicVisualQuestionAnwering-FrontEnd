// 
  // Screens/HomeScreen.jsx
//   import React, { useEffect } from 'react';
//   import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
//   import Tts from 'react-native-tts';

  
//   useEffect(() => 
//     {
//       Tts.stop();
//       Tts.speak("Welcome to See For Me . AI that sees, reasons and explains.");
//   }, [Tts.stop()]);



//   export default function HomeScreen({ navigation }) {
//     return (
//       <View style={styles.container}>
//         <Image source={require('../logos/logo.png')} style={styles.logo} />
//         <Text style={styles.title}>SEEFORME</Text>
//         <Text style={styles.subtitle}>
//           AI that sees, reasons{'\n'}and explains
//         </Text>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('Login')}
//           style={styles.loginButton}
//         >
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('MainPorc')}>
          
//           <Image
//             source={require('../logos/microphone.png')}
//             style={styles.microphone}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   logo: { width: 200, height: 130, marginBottom: 10 },
//   title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginTop: 10 },
//   subtitle: { fontSize: 18, color: '#000', fontStyle: 'italic', textAlign: 'center', marginVertical: 10 },
//   loginButton: {
//     backgroundColor: '#000',
//     width: 180,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 25,
//     marginTop: 20,
//     elevation: 3,
//   },
//   loginText: { color: "#fff", fontSize: 20, fontWeight: 'bold' },
//   microphone: { width: 110, height: 110, marginTop: 40 },
// });


import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import Tts from 'react-native-tts';

export default function HomeScreen({ navigation }) {

  /* ✅ Welcome TTS – run once */
  useEffect(() => {
    Tts.stop();
    Tts.speak("Welcome to See For Me. AI that sees, reasons, and explains.");
  }, []);

  return (
    <View style={styles.container}>

      <Image
        source={require('../logos/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>SEEFORME</Text>

      <Text style={styles.subtitle}>
        AI that sees, reasons{'\n'}and explains
      </Text>

      {/* ✅ Login Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginButton}
        accessible
        accessibilityLabel="Login"
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* ✅ Mic Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MainPorc')}
        accessible
        accessibilityLabel="Voice assistant"
      >
        <Image
          source={require('../logos/microphone.png')}
          style={styles.microphone}
        />
      </TouchableOpacity>

    </View>
  );
}

/* ✅ Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2D5C6",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 130,
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10
  },
  loginButton: {
    backgroundColor: '#000',
    width: 180,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  microphone: {
    width: 110,
    height: 110,
    marginTop: 40
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   Alert,
// } from "react-native";
// import AudioRecord from "react-native-audio-record";
// import axios from "axios";
// import CONFIG from "../ipconfig"; // { LAN: 'http://localhost:5000' }

// export default function AudioScreen() {
//   const [recording, setRecording] = useState(false);
//   const [question, setQuestion] = useState("");

//   // Request microphone permission
//   const requestPermissions = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: "Audio Permission",
//           message: "App needs access to your microphone",
//           buttonPositive: "OK",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   // Start recording
//   const startRecording = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Microphone permission is required");
//       return;
//     }

//     AudioRecord.init({
//       sampleRate: 16000,
//       channels: 1,
//       bitsPerSample: 16,
//       audioSource: 6,
//       wavFile: "question.wav",
//     });

//     setQuestion("");
//     setRecording(true);
//     AudioRecord.start();
//     Alert.alert("Recording", "Start speaking your question...");
//   };

//   // Stop recording & send to backend
//  // Stop recording & send
// const stopRecording = async () => {
//   try {
//     const filePath = await AudioRecord.stop();
//     setRecording(false);

//     const formData = new FormData();
//     formData.append("audio", {
//       uri: Platform.OS === "android" ? "file://" + filePath : filePath,
//       type: "audio/wav",
//       name: "question.wav",
//     });

//     // Do NOT set Content-Type manually; let axios set the multipart boundary
//     const res = await axios.post(`${CONFIG.LAN}/audio/transcribe`, formData);

//     setQuestion(res.data.text || "");
//     Alert.alert("Transcribed Text", res.data.text || "No text received");
//   } catch (err) {
//     console.log("❌ Audio upload error:", err.message);
//     Alert.alert("Error", "Failed to send audio to backend");
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎙 Ask by Voice</Text>

//       <TouchableOpacity
//         style={[styles.button, recording && styles.recordingButton]}
//         onPress={recording ? stopRecording : startRecording}
//       >
//         <Text style={styles.btnText}>
//           {recording ? "⏹ Stop & Send" : "🎙 Start Recording"}
//         </Text>
//       </TouchableOpacity>

//       {question ? (
//         <View style={styles.textContainer}>
//           <Text style={styles.label}>🗣️ Transcribed Text:</Text>
//           <Text style={styles.text}>{question}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
//   button: {
//     backgroundColor: "#1976D2",
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   recordingButton: { backgroundColor: "#D32F2F" },
//   btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
//   textContainer: {
//     marginTop: 20,
//     backgroundColor: "#E3F2FD",
//     padding: 15,
//     borderRadius: 10,
//     width: "90%",
//   },
//   label: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
//   text: { fontSize: 16 },
// });


