// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { launchCamera } from "react-native-image-picker";
// import AudioRecord from "react-native-audio-record";
// import axios from "axios";
// import Tts from "react-native-tts";
// import CONFIG from "../../ipconfig";
// import {getAnswerAPI,transcribeAudioAPI,voiceCommandAPI} from "../Apis";


// const RECORD_TIME = 5000;
// const IMAGE_INTERVAL = 10000;

// export default function TemporalReasoning() {
//   const BLIND_ID = 1;

//   const imageRef = useRef(null);
//   const questionRef = useRef("");
//   const loopRef = useRef(null);
//   const recordingRef = useRef(false);

//   const [previewImage, setPreviewImage] = useState(null);
//   const [answer, setAnswer] = useState("");

//   // ---------------- TTS ----------------
//   const speak = (text, onFinish) => {
//     Tts.stop();
//     if (onFinish) {
//       const listener = Tts.addEventListener("tts-finish", () => {
//         listener.remove();
//         onFinish();
//       });
//     }
//     Tts.speak(text);
//   };

//   // ---------------- IMAGE ----------------
//   const captureImage = async () => {
//     return new Promise((resolve) => {
//       launchCamera({ mediaType: "photo", cameraType: "back" }, (res) => {
//         if (res?.assets?.[0]) {
//           const img = res.assets[0];
//           imageRef.current = img;
//           setPreviewImage({ uri: img.uri });
//           resolve(img);
//         } else resolve(null);
//       });
//     });
//   };

//   // ---------------- AUDIO ----------------
//   const recordQuestion = async () => {
//     AudioRecord.init({
//       sampleRate: 16000,
//       channels: 1,
//       bitsPerSample: 16,
//       wavFile: "question.wav",
//     });

//     recordingRef.current = true;
//     AudioRecord.start();

//     return new Promise((resolve) => {
//       setTimeout(async () => {
//         const path = await AudioRecord.stop();
//         recordingRef.current = false;

//         const uri = "file://" + path;

//         const form = new FormData();
//         form.append("audio", { uri, type: "audio/wav", name: "q.wav" });

//         // const res = await axios.post(
//         //   `${CONFIG.LAN}/audio/transcribe`,
//         //   form,
//         //   { headers: { "Content-Type": "multipart/form-data" } }
//         // );

//         const res=await transcribeAudioAPI(form)

//         resolve(res?.data?.text || "");
//       }, RECORD_TIME);
//     });
//   };

//   // ---------------- ANSWER ----------------
//   const getAnswer = async () => {
//     if (!imageRef.current || !questionRef.current) return;

//     const form = new FormData();
//     form.append("question", questionRef.current);
//     form.append("image", {
//       uri: imageRef.current.uri,
//       type: imageRef.current.type,
//       name: "image.jpg",
//     });

//     // const res = await axios.post(
//     //   `${CONFIG.LAN}/answers/getanswer/${BLIND_ID}`,
//     //   form,
//     //   { headers: { "Content-Type": "multipart/form-data" } }
//     // );

//     const res=await getAnswerAPI(form)

//     const ans = res?.data?.answer || "No answer";
//     setAnswer(ans);
//     speak(ans);
//   };

//   // ---------------- LOOP ----------------
//   const startImageLoop = () => {
//     clearInterval(loopRef.current);

//     loopRef.current = setInterval(async () => {
//       await captureImage();
//       await getAnswer();
//     }, IMAGE_INTERVAL);
//   };

//   // ---------------- ASK FLOW ----------------
//   const handleAskFlow = async () => {
//     clearInterval(loopRef.current);

//     speak("Capturing image", async () => {
//       const img = await captureImage();
//       if (!img) return;

//       speak("Ask your question now", async () => {
//         const q = await recordQuestion();
//         if (!q) return;

//         questionRef.current = q;

//         await getAnswer();
//         startImageLoop();
//       });
//     });
//   };

//   // ---------------- WAKE WORD ----------------
//   const startWakeWordListening = async () => {
//     AudioRecord.init({
//       sampleRate: 16000,
//       channels: 1,
//       bitsPerSample: 16,
//       wavFile: "wake.wav",
//     });

//     AudioRecord.start();

//     setTimeout(async () => {
//       const path = await AudioRecord.stop();
//       const uri = "file://" + path;

//       const form = new FormData();
//       form.append("audio", { uri, type: "audio/wav", name: "wake.wav" });

//       // const res = await axios.post(
//       //   `${CONFIG.LAN}/audio/voice/command`,
//       //   form,
//       //   { headers: { "Content-Type": "multipart/form-data" } }
//       // );

//       const res=await voiceCommandAPI(form)
//       if (res?.data?.command === "ask") {
//         handleAskFlow();
//       } else {
//         startWakeWordListening();
//       }
//     }, RECORD_TIME);
//   };

//   // ---------------- ON LOAD ----------------
//   useEffect(() => {
//     speak("Say ask to begin", startWakeWordListening);

//     return () => {
//       clearInterval(loopRef.current);
//       if (recordingRef.current) AudioRecord.stop();
//       Tts.stop();
//     };
//   }, []);

//   // ---------------- UI ----------------
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Temporal Reasoning</Text>

//       {previewImage && (
//         <Image source={previewImage} style={styles.image} />
//       )}

//       {answer ? <Text style={styles.answer}>{answer}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#A2D5C6", alignItems: "center", paddingTop: 30 },
//   title: { fontSize: 22, fontWeight: "800", marginBottom: 10 },
//   image: { width: 260, height: 260, borderRadius: 16, marginBottom: 20 },
//   answer: { fontSize: 18, paddingHorizontal: 20, textAlign: "center" },
// });



// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// import { takePhotoFromCamera } from "../Services/ImagePicker";
// import { recordAudioUntilSilence } from "../Services/AudioRecording";
// import { speakText, removeTtsListener } from "../Services/TextToSpeech";
// import { listenForWakeWord } from "../Services/WakeWordDetection";
// import { getAnswerAPI, transcribeAudioAPI } from "../Apis";

// const IMAGE_INTERVAL = 10000;

// export default function TemporalReasoning() {
//   const BLIND_ID = 1;
//   const isActiveRef = useRef(true);
//   const imageLoopRef = useRef(null);
//   const questionRef = useRef("");

//   const [previewImage, setPreviewImage] = useState(null);
//   const [answer, setAnswer] = useState("");

//   // ---------------- CLEANUP SAFE GUARD ----------------
//   const safe = (fn) => (...args) => {
//     if (isActiveRef.current) fn(...args);
//   };

//   // ---------------- IMAGE LOOP ----------------
//   const startImageLoop = () => {
//     clearInterval(imageLoopRef.current);

//     imageLoopRef.current = setInterval(async () => {
//       if (!isActiveRef.current) return;

//       const img = await takePhotoFromCamera();
//       if (!img) return;

//       setPreviewImage({ uri: img.uri });

//       const form = new FormData();
//       form.append("question", questionRef.current);
//       form.append("image", {
//         uri: img.uri,
//         type: img.type,
//         name: "image.jpg",
//       });

//       const res = await getAnswerAPI(BLIND_ID,form);
//       const ans = res?.data?.answer || "No answer";

//       setAnswer(ans);
//       speakText(ans);
//     }, IMAGE_INTERVAL);
//   };

//   // ---------------- ASK FLOW ----------------
//   const handleAskFlow = async () => {
//     speakText("Capturing image", async () => {
//       const img = await takePhotoFromCamera();
//       if (!img) return;

//       setPreviewImage({ uri: img.uri });

//       speakText("Ask your question now", async () => {
//         const audioUri = await recordAudioUntilSilence();
//         if (!audioUri) return;

//         const form = new FormData();
//         form.append("audio", {
//           uri: audioUri,
//           type: "audio/wav",
//           name: "question.wav",
//         });

//         const res = await transcribeAudioAPI(form);
//         const question = res?.data?.text;

//         if (!question) return;
//         questionRef.current = question;

//         // FIRST ANSWER
//         const qForm = new FormData();
//         qForm.append("question", question);
//         qForm.append("image", {
//           uri: img.uri,
//           type: img.type,
//           name: "image.jpg",
//         });

//         const ansRes = await getAnswerAPI(BLIND_ID,qForm);
//         const ans = ansRes?.data?.answer || "No answer";

//         setAnswer(ans);
//         speakText(ans);

//         startImageLoop();
//       });
//     });
//   };

//   // ---------------- WAKE WORD LOOP ----------------
//   const wakeWordLoop = async () => {
//     if (!isActiveRef.current) return;

//     const command = await listenForWakeWord(4000);

//     if (!isActiveRef.current) return;

//     if (command === "ask") {
//       handleAskFlow();
//     } else {
//       wakeWordLoop();
//     }
//   };

//   // ---------------- ON LOAD ----------------
//   useEffect(() => {
//     isActiveRef.current = true;

//     speakText("Say ask to begin", wakeWordLoop);

//     return () => {
//       isActiveRef.current = false;
//       clearInterval(imageLoopRef.current);
//       removeTtsListener();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Temporal Reasoning</Text>
//       {previewImage && <Image source={previewImage} style={styles.image} />}
//       {answer ? <Text style={styles.answer}>{answer}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#A2D5C6", alignItems: "center", paddingTop: 30 },
//   title: { fontSize: 22, fontWeight: "800", marginBottom: 10 },
//   image: { width: 260, height: 260, borderRadius: 16, marginBottom: 20 },
//   answer: { fontSize: 18, paddingHorizontal: 20, textAlign: "center" },
// });


// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// import { takePhotoFromCamera } from "../Services/ImagePicker";
// import { recordAudioUntilSilence } from "../Services/AudioRecording";
// import { speakText, removeTtsListener } from "../Services/TextToSpeech";
// import { listenForWakeWord } from "../Services/WakeWordDetection";
// import { getAnswerAPI, transcribeAudioAPI } from "../Apis";

// export default function TemporalReasoning() {
//   const BLIND_ID = 1;

//   // ---------------- REFS ----------------
//   const isActiveRef = useRef(true);
//   const loopActiveRef = useRef(false);
//   const wakeListeningRef = useRef(true);
//   const questionRef = useRef("");

//   // ---------------- STATE ----------------
//   const [previewImage, setPreviewImage] = useState(null);
//   const [answer, setAnswer] = useState("");

//   // ---------------- IMAGE → ANSWER LOOP ----------------
//   const imageAnswerLoop = async () => {
//     loopActiveRef.current = true;

//     while (loopActiveRef.current && isActiveRef.current) {
//       console.log("[LOOP] Capture image");

//       const img = await takePhotoFromCamera();
//       if (!img || !isActiveRef.current) break;

//       setPreviewImage({ uri: img.uri });

//       const form = new FormData();
//       form.append("question", questionRef.current);
//       form.append("image", {
//         uri: img.uri,
//         type: img.type,
//         name: "image.jpg",
//       });

//       const res = await getAnswerAPI(BLIND_ID, form);
//       const ans = res?.data?.answer || "No answer";

//       setAnswer(ans);

//       // 🔒 WAIT for TTS to finish before next capture
//       await new Promise((resolve) => {
//         speakText(ans, resolve);
//       });
//     }
//   };

//   // ---------------- ASK FLOW ----------------
//   const handleAskFlow = async () => {
//     wakeListeningRef.current = false; // stop wake-word

//     speakText("Capturing image", async () => {
//       const img = await takePhotoFromCamera();
//       if (!img || !isActiveRef.current) return;

//       setPreviewImage({ uri: img.uri });

//       speakText("Ask your question now", async () => {
//         const audioUri = await recordAudioUntilSilence();
//         if (!audioUri || !isActiveRef.current) return;

//         const form = new FormData();
//         form.append("audio", {
//           uri: audioUri,
//           type: "audio/wav",
//           name: "question.wav",
//         });

//         const res = await transcribeAudioAPI(form);
//         const question = res?.data?.text;
//         if (!question) return;

//         questionRef.current = question;

//         // FIRST ANSWER
//         const qForm = new FormData();
//         qForm.append("question", question);
//         qForm.append("image", {
//           uri: img.uri,
//           type: img.type,
//           name: "image.jpg",
//         });

//         const ansRes = await getAnswerAPI(BLIND_ID, qForm);
//         const ans = ansRes?.data?.answer || "No answer";

//         setAnswer(ans);

//         await new Promise((resolve) => {
//           speakText(ans, resolve);
//         });

//         // 🔁 start continuous capture
//         imageAnswerLoop();
//       });
//     });
//   };

//   // ---------------- WAKE WORD LOOP ----------------
//   const wakeWordLoop = async () => {
//     if (!isActiveRef.current || !wakeListeningRef.current) return;

//     const command = await listenForWakeWord(4000);
//     if (!isActiveRef.current) return;

//     if (command === "ask") {
//       handleAskFlow();
//     } else {
//       wakeWordLoop();
//     }
//   };

//   // ---------------- LIFECYCLE ----------------
//   useEffect(() => {
//     isActiveRef.current = true;

//     speakText("Say ask to begin", wakeWordLoop);

//     return () => {
//       console.log("[CLEANUP]");
//       isActiveRef.current = false;
//       loopActiveRef.current = false;
//       wakeListeningRef.current = false;
//       removeTtsListener();
//     };
//   }, []);

//   // ---------------- UI ----------------
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Temporal Reasoning</Text>

//       {previewImage && (
//         <Image source={previewImage} style={styles.image} />
//       )}

//       {answer ? <Text style={styles.answer}>{answer}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//     alignItems: "center",
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "800",
//     marginBottom: 10,
//   },
//   image: {
//     width: 260,
//     height: 260,
//     borderRadius: 16,
//     marginBottom: 20,
//   },
//   answer: {
//     fontSize: 18,
//     paddingHorizontal: 20,
//     textAlign: "center",
//   },
// });


// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// import { takePhotoFromCamera } from "../Services/ImagePicker";
// import { recordAudioUntilSilence } from "../Services/AudioRecording";
// import { speakText, removeTtsListener } from "../Services/TextToSpeech";
// import { listenForWakeWord } from "../Services/WakeWordDetection";
// import { getAnswerAPI, transcribeAudioAPI } from "../Apis";

// export default function TemporalReasoning() {
//   const BLIND_ID = 1;

//   // ---------------- REFS ----------------
//   const isActiveRef = useRef(true);
//   const loopActiveRef = useRef(false);
//   const wakeListeningRef = useRef(true);
//   const questionRef = useRef("");

//   // ---------------- STATE ----------------
//   const [previewImage, setPreviewImage] = useState(null);
//   const [answer, setAnswer] = useState("");

//   // ---------------- IMAGE → ANSWER LOOP ----------------
//   // const imageAnswerLoop = async () => {
//   //   loopActiveRef.current = true;

//   //   while (loopActiveRef.current && isActiveRef.current) {
//   //     console.log("[LOOP] Capture image");

//   //     const img = await takePhotoFromCamera();
//   //     if (!img || !isActiveRef.current) break;

//   //     setPreviewImage({ uri: img.uri });

//   //     const form = new FormData();
//   //     form.append("question", questionRef.current);
//   //     form.append("image", {
//   //       uri: img.uri,
//   //       type: img.type,
//   //       name: "image.jpg",
//   //     });

//   //     const res = await getAnswerAPI(BLIND_ID, form);
//   //     const ans = res?.data?.answer || "No answer";

//   //     setAnswer(ans);

//   //     // 🔒 WAIT for TTS to finish before next capture
//   //     await new Promise((resolve) => {
//   //       speakText(ans, resolve);
//   //     });
//   //   }
//   // };

// // 10 iteration one
//   const imageAnswerLoop = async () => {
//   loopActiveRef.current = true;
//   let count = 0;

//   while (
//     loopActiveRef.current &&
//     isActiveRef.current &&
//     count < 10
//   ) {
//     count++;
//     console.log(`[LOOP] Capture image ${count}/10`);

//     const img = await takePhotoFromCamera();
//     if (!img || !isActiveRef.current) break;

//     setPreviewImage({ uri: img.uri });

//     const form = new FormData();
//     form.append("question", questionRef.current);
//     form.append("image", {
//       uri: img.uri,
//       type: img.type,
//       name: "image.jpg",
//     });

//     const res = await getAnswerAPI(BLIND_ID, form);
//     const ans = res?.data?.answer || "No answer";

//     setAnswer(ans);

//     // 🔒 wait for TTS to finish
//     await new Promise((resolve) => speakText(ans, resolve));
//   }

//   console.log("Image loop finished → back to wake word");
//   wakeListeningRef.current = true;
//   wakeWordLoop();
// };


//   // ---------------- ASK FLOW ----------------
//   const handleAskFlow = async () => {
//     wakeListeningRef.current = false; // stop wake-word

//     speakText("Capturing image", async () => {
//       const img = await takePhotoFromCamera();
//       if (!img || !isActiveRef.current) return;

//       setPreviewImage({ uri: img.uri });

//       speakText("Ask your question now", async () => {
//         const audioUri = await recordAudioUntilSilence();
//         if (!audioUri || !isActiveRef.current) return;

//         const form = new FormData();
//         form.append("audio", {
//           uri: audioUri,
//           type: "audio/wav",
//           name: "question.wav",
//         });

//         const res = await transcribeAudioAPI(form);
//         const question = res?.data?.text;
//         if (!question) return;

//         questionRef.current = question;

//         // FIRST ANSWER
//         const qForm = new FormData();
//         qForm.append("question", question);
//         qForm.append("image", {
//           uri: img.uri,
//           type: img.type,
//           name: "image.jpg",
//         });

//         const ansRes = await getAnswerAPI(BLIND_ID, qForm);
//         const ans = ansRes?.data?.answer || "No answer";

//         setAnswer(ans);

//         await new Promise((resolve) => {
//           speakText(ans, resolve);
//         });

//         // 🔁 start continuous capture
//         imageAnswerLoop();
//       });
//     });
//   };

//   // wakeListeningRef.current = false; // stop wake listening
//   // wakeListeningRef.current = true;  // resume wake listening


//   // ---------------- WAKE WORD LOOP ----------------
//   const wakeWordLoop = async () => {
//     if (!isActiveRef.current || !wakeListeningRef.current) return;

//     const command = await listenForWakeWord(4000);
//     if (!isActiveRef.current) return;

//         if (command === "ask") {
//           handleAskFlow();
//         }
//         else if (command === "continue") {
//             console.log("Continuing with same question");
//             wakeListeningRef.current = false;
//             imageAnswerLoop(); // resumes with SAME question
//       }
//       else if (command=="stop")
//       {
//         wakeListeningRef.current = true;
//         loopActiveRef.current = false;
//         speakText("Stopped. Say ask to continue");
//       }
//       else if(command=="back")
//       {
//         wakeListeningRef.current = false;
//         loopActiveRef.current = false;
//         speakText("Going back", () => navigation.navigate("Login"));
//       }
//         else {
//           wakeWordLoop();
//         }
//   };

//   // ---------------- LIFECYCLE ----------------
//   useEffect(() => {
//     isActiveRef.current = true;

//     speakText("Say ask to begin", wakeWordLoop);

//     return () => {
//       console.log("[CLEANUP]");
//       isActiveRef.current = false;
//       loopActiveRef.current = false;
//       wakeListeningRef.current = false;
//       removeTtsListener();
//     };
//   }, []);

//   // ---------------- UI ----------------
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Temporal Reasoning</Text>

//       {previewImage && (
//         <Image source={previewImage} style={styles.image} />
//       )}

//       {answer ? <Text style={styles.answer}>{answer}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//     alignItems: "center",
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "800",
//     marginBottom: 10,
//   },
//   image: {
//     width: 260,
//     height: 260,
//     borderRadius: 16,
//     marginBottom: 20,
//   },
//   answer: {
//     fontSize: 18,
//     paddingHorizontal: 20,
//     textAlign: "center",
//   },
// });


// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// import { takePhotoFromCamera } from "../Services/ImagePicker";
// import { recordAudioUntilSilence } from "../Services/AudioRecording";
// import { speakText, removeTtsListener } from "../Services/TextToSpeech";
// import { listenForWakeWord } from "../Services/WakeWordDetection";
// import AutoCamera from "../Services/AutoCamera";
// import { getAnswerAPI, transcribeAudioAPI } from "../Apis";

// export default function TemporalReasoning({ navigation }) {
//   const BLIND_ID = 1;

//   // ---------------- REFS ----------------
//   const isActiveRef = useRef(true);
//   const loopActiveRef = useRef(false);
//   const wakeListeningRef = useRef(true);
//   const questionRef = useRef("");
//   const captureCallbackRef = useRef(null);
//   const [status, setStatus] = useState("idle");

//   // ---------------- STATE ----------------
//   const [previewImage, setPreviewImage] = useState(null);
//   const [answer, setAnswer] = useState("");
//   const [showCamera, setShowCamera] = useState(false);

//   // ---------------- AUTO CAPTURE ----------------
//   const captureImageAuto = () => {
//     console.log("[Camera] Auto capture started");
//     return new Promise((resolve) => {
//       setShowCamera(true);

//       const onCaptured = (img) => {
//         console.log("[Camera] Image captured:", img?.uri);
//         setShowCamera(false);

//         if (img) {
//           setPreviewImage({ uri: img.uri });
//         }

//         resolve(img);
//       };

//       captureCallbackRef.current = onCaptured;
//     });
//   };

//   // ---------------- IMAGE → ANSWER LOOP ----------------
//   // const imageAnswerLoop = async () => {
//   //   loopActiveRef.current = true;
//   //   let count = 0;

//   //   while (loopActiveRef.current && isActiveRef.current && count < 10) {
//   //     count++;
//   //     console.log(`[LOOP] Capture image ${count}/10`);

//   //     // ✅ Use auto capture instead of manual
//   //     const img = await captureImageAuto();
//   //     if (!img || !isActiveRef.current) break;

//   //     const form = new FormData();
//   //     form.append("question", questionRef.current);
//   //     form.append("image", {
//   //       uri: img.uri,
//   //       type: img.type,
//   //       name: "image.jpg",
//   //     });

//   //     const res = await getAnswerAPI(BLIND_ID, form);
//   //     const ans = res?.data?.answer || "No answer";
//   //     if (ans==="Incorrect")
//   //     {
//   //       speakText("The question asked is invalid. Please ask a valid question.Say Continue to record Again", () => {wakeWordLoop()}); 
//   //     }
//   //     setAnswer(ans);

//   //     // 🔒 wait for TTS to finish
//   //     await new Promise((resolve) => speakText(ans, resolve));
//   //   }

//   //   console.log("Image loop finished → back to wake word");
//   //   wakeListeningRef.current = true;
//   //   wakeWordLoop();
//   // };

//   const imageAnswerLoop = async () => {
//   loopActiveRef.current = true;
//   setStatus("processing");

//   let count = 0;

//   while (loopActiveRef.current && isActiveRef.current && count < 5) {
//     count++;
//     console.log(`[LOOP] Capture image ${count}/10`);

//     const img = await captureImageAuto();
//     if (!img || !isActiveRef.current) break;

//     const form = new FormData();
//     form.append("question", questionRef.current);
//     form.append("image", {
//       uri: img.uri,
//       type: img.type,
//       name: "image.jpg",
//     });

//     const res = await getAnswerAPI(BLIND_ID, form);
//     const ans = res?.data?.answer || "Incorrect";

//     // ❌ STOP ON INCORRECT
//     if (ans === "Incorrect") {
//       loopActiveRef.current = false;
//       wakeListeningRef.current = true;
//       setStatus("wake");

//       speakText(
//         "I could not understand the question. Say ask to record again, or say continue to retry.",
//         wakeWordLoop
//       );
//       return;
//     }

//     setAnswer(ans);
//     await new Promise((resolve) => speakText(ans, resolve));
//   }

//   console.log("[LOOP] Finished");
//   wakeListeningRef.current = true;
//   setStatus("wake");
//   wakeWordLoop();
// };


//   // ---------------- ASK FLOW ----------------
//   // const handleAskFlow = async () => {
//   //   wakeListeningRef.current = false; // stop wake-word

//   //   speakText("Capturing image", async () => {
//   //     // ✅ Use auto capture
//   //     const img = await captureImageAuto();
//   //     if (!img || !isActiveRef.current) return;

//   //     speakText("Ask your question now", async () => {
//   //       const audioUri = await recordAudioUntilSilence();
//   //       if (!audioUri || !isActiveRef.current) return;

//   //       const form = new FormData();
//   //       form.append("audio", {
//   //         uri: audioUri,
//   //         type: "audio/wav",
//   //         name: "question.wav",
//   //       });

//   //       const res = await transcribeAudioAPI(form);
//   //       const question = res?.data?.text;
        
//   //       if (!question) return;

//   //       questionRef.current = question;

//   //       // FIRST ANSWER
//   //       const qForm = new FormData();
//   //       qForm.append("question", question);
//   //       qForm.append("image", {
//   //         uri: img.uri,
//   //         type: img.type,
//   //         name: "image.jpg",
//   //       });

//   //       const ansRes = await getAnswerAPI(BLIND_ID, qForm);
//   //       const ans = ansRes?.data?.answer || "No answer";
//   //       if (ans === "Incorrect") {
//   //         speakText("The question asked is invalid. Please ask a valid question.Say Continue to record Again", () => {wakeWordLoop()});
//   //       }
//   //       setAnswer(ans);

//   //       await new Promise((resolve) => {
//   //         speakText(ans, resolve);
//   //       });

//   //       // 🔁 start continuous capture
//   //       imageAnswerLoop();
//   //     });
//   //   });
//   // };

//   const handleAskFlow = async () => {
//   wakeListeningRef.current = false;
//   setStatus("processing");

//   speakText("Capturing image", async () => {
//     const img = await captureImageAuto();
//     if (!img || !isActiveRef.current) return;

//     setStatus("recording");
//     speakText("Ask your question now", async () => {
//       const audioUri = await recordAudioUntilSilence();
//       if (!audioUri || !isActiveRef.current) return;

//       setStatus("processing");

//       const form = new FormData();
//       form.append("audio", {
//         uri: audioUri,
//         type: "audio/wav",
//         name: "question.wav",
//       });

//       const res = await transcribeAudioAPI(form);
//       const question = res?.data?.text;
//       if (!question) return;

//       questionRef.current = question;

//       const qForm = new FormData();
//       qForm.append("question", question);
//       qForm.append("image", {
//         uri: img.uri,
//         type: img.type,
//         name: "image.jpg",
//       });

//       const ansRes = await getAnswerAPI(BLIND_ID, qForm);
//       const ans = ansRes?.data?.answer || "Incorrect";

//       if (ans === "Incorrect") {
//         wakeListeningRef.current = true;
//         setStatus("wake");

//         speakText(
//           "That question was unclear. Say ask to try again, or say continue to retry.",
//           wakeWordLoop
//         );
//         return;
//       }

//       setAnswer(ans);
//       await new Promise((resolve) => speakText(ans, resolve));

//       imageAnswerLoop();
//     });
//   });
// };

// // const wakeWordLoop = async () => {
// //   if (!isActiveRef.current || !wakeListeningRef.current) return;

// //   setStatus("wake");
// //   const command = await listenForWakeWord(4000);
// //   if (!isActiveRef.current) return;

// //   if (command === "ask") {
// //     handleAskFlow();
// //   } else if (command === "continue") {
// //     wakeListeningRef.current = false;
// //     imageAnswerLoop();
// //   } else if (command === "stop") {
// //     loopActiveRef.current = false;
// //     speakText("Stopped. Say ask to continue.");
// //   } else if (command === "back") {
// //     loopActiveRef.current = false;
// //     speakText("Going back", () => navigation.navigate("Login"));
// //   } else {
// //     wakeWordLoop();
// //   }
// // };


//   // ---------------- WAKE WORD LOOP ----------------
  
//   const wakeWordLoop = async () => {
//     if (!isActiveRef.current || !wakeListeningRef.current) return;

//     const command = await listenForWakeWord(4000);
//     if (!isActiveRef.current) return;

//     if (command === "ask") {
//       handleAskFlow();
//     } else if (command === "continue") {
//       console.log("Continuing with same question");
//       wakeListeningRef.current = false;
//       imageAnswerLoop(); // resumes with SAME question
//     } else if (command === "stop") {
//       wakeListeningRef.current = true;
//       loopActiveRef.current = false;
//       speakText("Stopped. Say ask to continue");
//     } else if (command === "back") {
//       wakeListeningRef.current = false;
//       loopActiveRef.current = false;
//       speakText("Going back", () => navigation.navigate("Login"));
//     } else {
//       wakeWordLoop();
//     }
//   };

//   // ---------------- LIFECYCLE ----------------
//   useEffect(() => {
//     isActiveRef.current = true;

//     speakText("Say ask to begin", wakeWordLoop);

//     return () => {
//       console.log("[CLEANUP]");
//       isActiveRef.current = false;
//       loopActiveRef.current = false;
//       wakeListeningRef.current = false;
//       removeTtsListener();
//     };
//   }, []);

//   // ---------------- UI ----------------
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Temporal Reasoning</Text>

//       <Text style={{ fontSize: 14, marginBottom: 10 }}>
//           {status === "wake" && "🟢 Listening for wake word"}
//           {status === "recording" && "🔴 Recording question"}
//           {status === "processing" && "🔵 Processing answer"}
//         </Text>


//       {/* ✅ Show camera when capturing */}
//       {showCamera && (
//         <View style={{ width: "100%", height: 400, marginBottom: 16, backgroundColor: "#000" }}>
//           <AutoCamera
//             onCaptured={(img) => {
//               console.log("[UI] AutoCamera returned image:", img?.uri);
//               captureCallbackRef.current?.(img);
//             }}
//           />
//         </View>
//       )}

//       {previewImage && <Image source={previewImage} style={styles.image} />}

//       {answer ? <Text style={styles.answer}>{answer}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A2D5C6",
//     alignItems: "center",
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "800",
//     marginBottom: 10,
//   },
//   image: {
//     width: 260,
//     height: 260,
//     borderRadius: 16,
//     marginBottom: 20,
//   },
//   answer: {
//     fontSize: 18,
//     paddingHorizontal: 20,
//     textAlign: "center",
//   },
// });


import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { takePhotoFromCamera } from "../Services/ImagePicker";
import { recordAudioUntilSilence } from "../Services/AudioRecording";
import { speakText, removeTtsListener } from "../Services/TextToSpeech";
import { listenForWakeWord } from "../Services/WakeWordDetection";
import AutoCamera from "../Services/AutoCamera";
import { getAnswerAPI, transcribeAudioAPI } from "../Apis";

export default function TemporalReasoning({ navigation }) {
  const BLIND_ID = 1;

  // ---------------- REFS ----------------
  const isActiveRef = useRef(true);
  const loopActiveRef = useRef(false);
  const wakeListeningRef = useRef(true);
  const questionRef = useRef("");
  const captureCallbackRef = useRef(null);
  const [status,setStatus] = useState("idle");
  const [TMstate,setTMstate]=useState("")
  // ---------------- STATE ----------------
  const [previewImage, setPreviewImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [emotion,setEmotion]=useState("")
  const emotions=["angry","sad","nuetral","fear"]

  // ---------------- AUTO CAPTURE ----------------
  const captureImageAuto = () => {
    console.log("[Camera] Auto capture started");
    return new Promise((resolve) => {
      setShowCamera(true);

      const onCaptured = (img) => {
        console.log("[Camera] Image captured:", img?.uri);
        setShowCamera(false);

        if (img) {
          setPreviewImage({ uri: img.uri });
        }

        resolve(img);
      };

      captureCallbackRef.current = onCaptured;
    });
  };

  // ---------------- IMAGE → ANSWER LOOP ----------------
  // const imageAnswerLoop = async () => {
  //   loopActiveRef.current = true;
  //   let count = 0;

  //   while (loopActiveRef.current && isActiveRef.current && count < 10) {
  //     count++;
  //     console.log(`[LOOP] Capture image ${count}/10`);

  //     // ✅ Use auto capture instead of manual
  //     const img = await captureImageAuto();
  //     if (!img || !isActiveRef.current) break;

  //     const form = new FormData();
  //     form.append("question", questionRef.current);
  //     form.append("image", {
  //       uri: img.uri,
  //       type: img.type,
  //       name: "image.jpg",
  //     });

  //     const res = await getAnswerAPI(BLIND_ID, form);
  //     const ans = res?.data?.answer || "No answer";
  //     if (ans==="Incorrect")
  //     {
  //       speakText("The question asked is invalid. Please ask a valid question.Say Continue to record Again", () => {wakeWordLoop()}); 
  //     }
  //     setAnswer(ans);

  //     // 🔒 wait for TTS to finish
  //     await new Promise((resolve) => speakText(ans, resolve));
  //   }

  //   console.log("Image loop finished → back to wake word");
  //   wakeListeningRef.current = true;
  //   wakeWordLoop();
  // };

  const imageAnswerLoop = async () => {
    loopActiveRef.current = true;
    setStatus("processing");

    let count = 0;

    while (loopActiveRef.current && isActiveRef.current && count < 20) {
      count++;
      console.log(`[LOOP] Capture image ${count}/100`);

      const img = await captureImageAuto();
      if (!img || !isActiveRef.current) break;

      const form = new FormData();
      form.append("question", questionRef.current);
      form.append("image", {
        uri: img.uri,
        type: img.type,
        name: "image.jpg",
      });

      console.log("recordind complted")

      
      const res = await getAnswerAPI(BLIND_ID, form);
      const ans = res?.data?.answer || "Incorrect";
      console.log("Answer Received")
      console.log(`emotion now is ${emotion}`)
      // ❌ STOP ON INCORRECT
      if (ans === "Incorrect") 
      {
        loopActiveRef.current = false;
        wakeListeningRef.current = true;
        setStatus("wake");

        speakText(
          "I could not understand the question. Say ask to record again, or say continue to retry.",
          wakeWordLoop
        );
        return;
      }

      else if (ans === "left") 
      {
        // setTMstate("temporal")
        loopActiveRef.current = false;
        wakeListeningRef.current = true;
        setStatus("wake");
        speakText(
          "Yes , the person has left the room . to deactivate temporal mode ....say temporal off",
          wakeWordLoop
        );
        return;
      }

      else if (ans==="angry"||ans==="sad"||ans==="nuetral"||ans==="fear"||ans==="happy")
      {
        console.log("in angry,if ans!==emotion")
        console.log(ans!==emotion)
        const boolem=ans!==emotion
        if(boolem==true)
        {
          
        speakText(
          `Yes , the emotion is changed to ${emotion}  ....say monitor off`,
          wakeWordLoop
        );
          

        }
        // console.log("Monitor question it was : emotion is ",ans)
        // setEmotion(ans)
      }

      // else if (ans === "room") {
      //   loopActiveRef.current = true;
      //   // wakeListeningRef.current = true;
      //   // setStatus("wake");

      //   // speakText(
      //   //   "Yes ,the person has left the room .",
      //   //   wakeWordLoop
      //   // );
      //   imageAnswerLoop()
      
      // }

      if (ans==="room")
      {
        setTMstate("temporal")
        imageAnswerLoop()
        return;
      }
      else
      {
        setAnswer(ans);
         await new Promise((resolve) => speakText(ans, resolve));
      }
  }

  console.log("[LOOP] Finished");
  wakeListeningRef.current = true;
  setStatus("wake");
  wakeWordLoop();
};


  // ---------------- ASK FLOW ----------------
  // const handleAskFlow = async () => {
  //   wakeListeningRef.current = false; // stop wake-word

  //   speakText("Capturing image", async () => {
  //     // ✅ Use auto capture
  //     const img = await captureImageAuto();
  //     if (!img || !isActiveRef.current) return;

  //     speakText("Ask your question now", async () => {
  //       const audioUri = await recordAudioUntilSilence();
  //       if (!audioUri || !isActiveRef.current) return;

  //       const form = new FormData();
  //       form.append("audio", {
  //         uri: audioUri,
  //         type: "audio/wav",
  //         name: "question.wav",
  //       });

  //       const res = await transcribeAudioAPI(form);
  //       const question = res?.data?.text;
        
  //       if (!question) return;

  //       questionRef.current = question;

  //       // FIRST ANSWER
  //       const qForm = new FormData();
  //       qForm.append("question", question);
  //       qForm.append("image", {
  //         uri: img.uri,
  //         type: img.type,
  //         name: "image.jpg",
  //       });

  //       const ansRes = await getAnswerAPI(BLIND_ID, qForm);
  //       const ans = ansRes?.data?.answer || "No answer";
  //       if (ans === "Incorrect") {
  //         speakText("The question asked is invalid. Please ask a valid question.Say Continue to record Again", () => {wakeWordLoop()});
  //       }
  //       setAnswer(ans);

  //       await new Promise((resolve) => {
  //         speakText(ans, resolve);
  //       });

  //       // 🔁 start continuous capture
  //       imageAnswerLoop();
  //     });
  //   });
  // };

  const ThandleAskFlow = async () => {
    wakeListeningRef.current = false;
    // setStatus("processing");
    console.log("handle ask flow")
    console.log(status,"is the status ")
    speakText("Capturing image", async () => {
      const img = await captureImageAuto();
      if (!img || !isActiveRef.current) return;

      setStatus("recording");
      speakText("Ask your question now", async () => {
        const audioUri = await recordAudioUntilSilence();
        if (!audioUri || !isActiveRef.current) return;

        setStatus("processing");

        const form = new FormData();
        form.append("audio", {
          uri: audioUri,
          type: "audio/wav",
          name: "question.wav",
        });

        const res = await transcribeAudioAPI(form);
        const question = res?.data?.text;
        if (!question) return;

        questionRef.current = question;

        const qForm = new FormData();
        qForm.append("question", question);
        qForm.append("image", {
          uri: img.uri,
          type: img.type,
          name: "image.jpg",
        });



        const ansRes = await getAnswerAPI(BLIND_ID, qForm);
        const ans = ansRes?.data?.answer || "Incorrect";
        console.log("answer is ",ans)
        if (ans === "Incorrect") {
          wakeListeningRef.current = true;
          setStatus("wake");

          speakText(
            "That question was unclear. Say ask to try again, or say continue to retry.",
            wakeWordLoop()
          );
        return;
        }
        if (ans==="room")
        { 
          // setTMstate("temporal")
          console.log("Room Answer in first loop")
          
          setAnswer(" ");
          imageAnswerLoop();
        }
        else if (ans==="angry"||ans==="sad"||ans==="nuetral"||ans==="fear"||ans==="happy")
        {
        // setTMstate("monitor")
        console.log("Monitor question it was : emotion is ",ans)
        wakeListeningRef.current = true;
        setStatus("wake");

          speakText(
            "This Question is from Monitor Toggle Please say Monitor ON to ask this",
            wakeWordLoop()
          );
        // setEmotion(ans)
        // imageAnswerLoop()

      }
        
        else 
        {
          await new Promise((resolve) => speakText(ans, resolve));
          imageAnswerLoop();
        }

  
      
    });
  });
};

  const MhandleAskFlow = async () => {
    wakeListeningRef.current = false;
    // setStatus("processing");
    console.log("Handle MOnitor Ask flow")
    console.log(status,"is the status ")
    speakText("Capturing image", async () => {
      const img = await captureImageAuto();
      if (!img || !isActiveRef.current) return;

      setStatus("recording");
      speakText("Ask your question now", async () => {
        const audioUri = await recordAudioUntilSilence();
        if (!audioUri || !isActiveRef.current) return;

        setStatus("processing");

        const form = new FormData();
        form.append("audio", {
          uri: audioUri,
          type: "audio/wav",
          name: "question.wav",
        });

        const res = await transcribeAudioAPI(form);
        const question = res?.data?.text;
        if (!question) return;

        questionRef.current = question;

        const qForm = new FormData();
        qForm.append("question", question);
        qForm.append("image", {
          uri: img.uri,
          type: img.type,
          name: "image.jpg",
        });

        console.log("Getting the answer : ")
        const ansRes = await getAnswerAPI(BLIND_ID, qForm);
        const ans = ansRes?.data?.answer || "Incorrect";
        console.log("answer is ",ans)
        if (ans === "Incorrect") {
          wakeListeningRef.current = true;
          setStatus("wake");

          speakText(
            "That question was unclear. Say ask to try again, or say continue to retry.",
            wakeWordLoop
          );
        return;
        }
        if (ans==="room")
        { 
          setTMstate("temporal")
          ans=" "
          setAnswer(ans);
          imageAnswerLoop();
          return;
        }
      else if (ans==="angry"||ans==="sad"||ans==="nuetral"||ans==="fear"||ans==="happy")
      {
        // setTMstate("monitor")
        console.log(`Monitor question it was : emotion is ${ans}`)
        setEmotion(ans)
        console.log(`At first emotion is ${emotion}`)
        imageAnswerLoop()
        return;

      }
        
        else 
        {
          await new Promise((resolve) => speakText(ans, resolve));
          imageAnswerLoop();
        }




      

      
    });
  });
};

  const handleAskFlow = async () => {
    wakeListeningRef.current = false;
    // setStatus("processing");
    console.log("handle ask flow")
    console.log(status,"is the status ")
    speakText("Capturing image", async () => {
      const img = await captureImageAuto();
      if (!img || !isActiveRef.current) return;

      setStatus("recording");
      speakText("Ask your question now", async () => {
        const audioUri = await recordAudioUntilSilence();
        if (!audioUri || !isActiveRef.current) return;

        setStatus("processing");

        const form = new FormData();
        form.append("audio", {
          uri: audioUri,
          type: "audio/wav",
          name: "question.wav",
        });

        const res = await transcribeAudioAPI(form);
        const question = res?.data?.text;
        if (!question) return;

        questionRef.current = question;

        const qForm = new FormData();
        qForm.append("question", question);
        qForm.append("image", {
          uri: img.uri,
          type: img.type,
          name: "image.jpg",
        });


        await sleep(1500)
        const ansRes = await getAnswerAPI(BLIND_ID, qForm);
        await sleep(1500)
        const ans = ansRes?.data?.answer || "Incorrect";
        console.log("answer Received ")
        if (ans === "Incorrect") {
          wakeListeningRef.current = true;
          setStatus("wake");

          speakText(
            "That question was unclear. Say ask to try again, or say continue to retry.",
            wakeWordLoop
          );
        return;
        }
        if (ans==="room")
        { 
          setTMstate("temporal")
          ans=" "
          setAnswer(ans);
          imageAnswerLoop();
        }
              else if (ans in emotions)
      {
        setTMstate("monitor")
        console.log("Monitor question it was : emotion is ",ans)
        setEmotion(ans)
        imageAnswerLoop()

      }
        
        else 
        {
          await new Promise((resolve) => speakText(ans, resolve));
          imageAnswerLoop();
        }




      

      
    });
  });
};

// const wakeWordLoop = async () => {
//   if (!isActiveRef.current || !wakeListeningRef.current) return;

//   setStatus("wake");
//   const command = await listenForWakeWord(4000);
//   if (!isActiveRef.current) return;

//   if (command === "ask") {
//     handleAskFlow();
//   } else if (command === "continue") {
//     wakeListeningRef.current = false;
//     imageAnswerLoop();
//   } else if (command === "stop") {
//     loopActiveRef.current = false;
//     speakText("Stopped. Say ask to continue.");
//   } else if (command === "back") {
//     loopActiveRef.current = false;
//     speakText("Going back", () => navigation.navigate("Login"));
//   } else {
//     wakeWordLoop();
//   }
// };


  // ---------------- WAKE WORD LOOP ----------------
  
  const wakeWordLoop = async () => {
    if (!isActiveRef.current || !wakeListeningRef.current) return;


    const command = await listenForWakeWord(3000);

    if (!isActiveRef.current) return;

    if (command === "ask") {
      // handleAskFlow();
      speakText("Asked is done",()=>handleAskFlow());
    }
    else if(command==="temporal on")
    {
        setStatus("temporal on")
        console.log("statis is ",status)
        speakText("Temporal On  is done",()=>ThandleAskFlow());
    }
    //  else if (command === "continue") {
    //   console.log("Continuing with same question");
    //   wakeListeningRef.current = false;
    //   imageAnswerLoop();
    //   // 
    //    // resumes with SAME question
    // } 
    else if (command === "temporal off")
    {
      wakeListeningRef.current = true;
      console.log("Temporal Off is done now....Say , Monitor or Temporal On/Off")
      // loopActiveRef.current = true;
      speakText("Temporal deactivated ...listening for wake word.",()=>wakeWordLoop());
      // wakeWordLoop()
      // speakText("temporal off");
    } 
    else if (command === "monitor off") 
    {
      wakeListeningRef.current = true;
      console.log("Monitor Off is done now....Say , Monitor or Temporal On/Off")
      // loopActiveRef.current = true;
      speakText("Monitor deactivated ...listening for wake word.",()=>wakeWordLoop());
      // wakeWordLoop()
      // speakText("temporal off");
    } 
    else if (command === "back") {
      wakeListeningRef.current = false;
      loopActiveRef.current = false;
      speakText("Going back", () => navigation.navigate("Login"));
    } 
    else if(command==="monitor on")
    {
      speakText("Monitor on is done",()=>MhandleAskFlow());
    }
    // else if(command==="monitor off")
    // {
    //   wakeListeningRef.current = true;
    //   console.log("Monitor Off is done now....Say , Monitor or Temporal On")
    //   // loopActiveRef.current = true;
    //   speakText("Temporal deactivated ...listening for wake word.",()=>wakeWordLoop());
    // }
    else {
      wakeWordLoop();
    }
  };

  // ---------------- LIFECYCLE ----------------
  useEffect(() => {
    isActiveRef.current = true;

    speakText("Say ask to begin", wakeWordLoop);

    return () => {
      console.log("[CLEANUP]");
      isActiveRef.current = false;
      loopActiveRef.current = false;
      wakeListeningRef.current = false;
      removeTtsListener();
    };
  }, []);

  // ---------------- UI ----------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temporal Reasoning</Text>

      <Text style={{ fontSize: 14, marginBottom: 10 }}>
          {status === "wake" && "🟢 Listening for wake word"}
          {status === "recording" && "🔴 Recording question"}
          {status === "processing" && "🔵 Processing answer"}
          {status ==="temporal on" && "😁 Listening for temporal Question"}
          {status ==="monitor on" && "😁 Listening for Monitoring Question"}
        </Text>


      {/* ✅ Show camera when capturing */}
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

      {previewImage && <Image source={previewImage} style={styles.image} />}

      {answer ? <Text style={styles.answer}>{answer}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2D5C6",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },
  answer: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});




