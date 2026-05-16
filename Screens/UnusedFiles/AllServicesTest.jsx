// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from "react-native";

// import { pickImagesFromGallery, takePhotoFromCamera } from "./Screens/Services/ImagePicker.js"
// import { speakText } from "./Screens/Services/TextToSpeech.js";
// import { recordAudio } from "./Screens/Services/AudioRecording.js";
// import { listenForWakeWord } from "./Screens/Services/WakeWordDetection.js";

// export default function ServiceTestScreen() {
//   const [logs, setLogs] = useState([]);

//   const log = (msg) => {
//     setLogs((prev) => [`${new Date().toLocaleTimeString()} ➜ ${msg}`, ...prev]);
//   };

//   // 🔁 MASTER ASYNC FLOW
//   const runAllServices = async () => {
//     try {
//       log("Starting service test...");

//       // 1️⃣ TTS
//       await new Promise((resolve) => {
//         speakText("Starting service test", resolve);
//       });
//       log("TTS completed");

//       // 2️⃣ Gallery
//       log("Opening gallery...");
//       const images = await pickImagesFromGallery(2);
//       if (images?.length) log(`Picked ${images.length} image(s)`);
//       else log("Gallery cancelled");

//       // 3️⃣ Camera
//       log("Opening camera...");
//       const photo = await takePhotoFromCamera();
//       if (photo) log("Photo captured");
//       else log("Camera cancelled");

//       // 4️⃣ Audio Recording
//       log("Recording audio for 3 seconds...");
//       const audioUri = await recordAudio(6000);
//       if (audioUri) log("Audio recorded");
//       else log("Audio failed");

//       // 5️⃣ Wake Word
//       log("Listening for wake word...");
//       const command = await listenForWakeWord();
//       log(`Wake word detected: ${command || "none"}`);

//       Alert.alert("Test Completed", "All services executed");
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Service test failed");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={runAllServices}>
//         <Text style={styles.btnText}>▶ Run Async Service Test</Text>
//       </TouchableOpacity>

//       <ScrollView style={styles.logBox}>
//         {logs.map((l, i) => (
//           <Text key={i} style={styles.logText}>
//             {l}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   button: {
//     backgroundColor: "#111",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   btnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   logBox: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//     padding: 10,
//     borderRadius: 8,
//   },
//   logText: {
//     fontSize: 13,
//     marginBottom: 5,
//   },
// });