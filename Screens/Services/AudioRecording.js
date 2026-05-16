// import AudioRecord from "react-native-audio-record";
// import { Platform, Alert } from "react-native";
// import { requestMediaPermissions } from "./Permissions";

// let dataListenerAttached = false;

// export const recordAudio = async (duration=4000) => {
//   const ok = await requestMediaPermissions();
//   if (!ok) {
//     Alert.alert("Permissions required");
//     return null;
//   }

//   AudioRecord.init({
//     sampleRate: 16000,
//     channels: 1,
//     bitsPerSample: 16,
//     wavFile: "voice.wav",
//   });

//   AudioRecord.start();

//   return new Promise((resolve) => {
//     setTimeout(async () => {
//       const path = await AudioRecord.stop();
//       const uri = Platform.OS === "android" ? "file://" + path : path;
//       resolve(uri);
//     }, duration);
//   });
// };

// // export const recordAudioUntilSilence = async () => {

// //   const ok = await requestMediaPermissions();
// //   if (!ok) {
// //     Alert.alert("Permissions required");
// //     return null;
// //   }

// //   AudioRecord.init({
// //     sampleRate: 16000,
// //     channels: 1,
// //     bitsPerSample: 16,
// //     wavFile: "question.wav",
// //   });

// //   let silenceCounter = 0;
// //   const silenceThreshold = 200; // tune according to environment
// //   const minSilenceDuration = 2000; // 2 sec silence
// //   const checkInterval = 200; // ms

// //   AudioRecord.start();

// //   return new Promise((resolve) => {
// //     const interval = setInterval(() => {
// //       // just check silenceCounter periodically
// //       if (silenceCounter >= minSilenceDuration) {
// //         clearInterval(interval);
// //         AudioRecord.stop().then((path) => {
// //           resolve(Platform.OS === "android" ? "file://" + path : path);
// //         });
// //       }
// //     }, checkInterval);

// //     AudioRecord.on("data", (chunk) => {
// //       // chunk is base64 PCM
// //       const byteArray = Uint8Array.from(atob(chunk), (c) => c.charCodeAt(0));
// //       let maxAmplitude = 0;
// //       for (let i = 0; i < byteArray.length; i += 2) {
// //         const sample = byteArray[i] | (byteArray[i + 1] << 8);
// //         const amplitude = Math.abs(sample);
// //         if (amplitude > maxAmplitude) maxAmplitude = amplitude;
// //       }

// //       if (maxAmplitude < silenceThreshold) {
// //         silenceCounter += checkInterval;
// //       } else {
// //         silenceCounter = 0;
// //       }
// //     });
// //   });
// // };

// export const recordAudioUntilSilence = async () => {
//   const ok = await requestMediaPermissions();
//   if (!ok) {
//     Alert.alert("Permissions required");
//     return null;
//   }

//   AudioRecord.init({
//     sampleRate: 16000,
//     channels: 1,
//     bitsPerSample: 16,
//     wavFile: "question.wav",
//   });

//   const silenceThreshold = 500; // amplitude threshold
//   const minSilenceDuration = 1500; // 1.5s
//   let lastSoundTime = Date.now();

//   AudioRecord.start();
//   console.log("[VAD] Recording started");

//   return new Promise((resolve, reject) => {
//     const interval = setInterval(async () => {
//       const elapsedSilence = Date.now() - lastSoundTime;
//       if (elapsedSilence >= minSilenceDuration) {
//         clearInterval(interval);
//         try {
//           const path = await AudioRecord.stop();
//           console.log("[VAD] Recording stopped");
          
//           resolve(Platform.OS === "android" ? "file://" + path : path);

//         } catch (err) {
//           reject(err);
//         }
//       }
//     });
//     if(!dataListenerAttached){
// AudioRecord.on("data", (chunk) => {
//   const buffer = Uint8Array.from(atob(chunk), c => c.charCodeAt(0));
//   let maxAmplitude = 0;

//   for (let i = 0; i < buffer.length; i += 2) {
//     const sample = buffer[i] | (buffer[i + 1] << 8);
//     const signedSample = sample >= 0x8000 ? sample - 0x10000 : sample;
//     const amplitude = Math.abs(signedSample);
//     if (amplitude > maxAmplitude) maxAmplitude = amplitude;
//   }

//   if (maxAmplitude > silenceThreshold) {
//     lastSoundTime = Date.now();
//     // console.log("[VAD] sound detected, amplitude:", maxAmplitude);
//   }
// });
// dataListenerAttached=true;
//   }
// AudioRecord.removeAllListeners?.();
// dataListenerAttached = false;



//   },100);
// };


import AudioRecord from "react-native-audio-record";
import { Platform, Alert } from "react-native";
import { requestMediaPermissions } from "./Permissions";

let dataListenerAttached = false;

export const recordAudio = async (duration=4000) => {
  const ok = await requestMediaPermissions();
  if (!ok) {
    Alert.alert("Permissions required");
    return null;
  }

  AudioRecord.init({
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    wavFile: "voice.wav",
  });

  AudioRecord.start();

  return new Promise((resolve) => {
    setTimeout(async () => {
      const path = await AudioRecord.stop();
      const uri = Platform.OS === "android" ? "file://" + path : path;
      resolve(uri);
    }, duration);
  });
};

// export const recordAudioUntilSilence = async () => {

//   const ok = await requestMediaPermissions();
//   if (!ok) {
//     Alert.alert("Permissions required");
//     return null;
//   }

//   AudioRecord.init({
//     sampleRate: 16000,
//     channels: 1,
//     bitsPerSample: 16,
//     wavFile: "question.wav",
//   });

//   let silenceCounter = 0;
//   const silenceThreshold = 200; // tune according to environment
//   const minSilenceDuration = 2000; // 2 sec silence
//   const checkInterval = 200; // ms

//   AudioRecord.start();

//   return new Promise((resolve) => {
//     const interval = setInterval(() => {
//       // just check silenceCounter periodically
//       if (silenceCounter >= minSilenceDuration) {
//         clearInterval(interval);
//         AudioRecord.stop().then((path) => {
//           resolve(Platform.OS === "android" ? "file://" + path : path);
//         });
//       }
//     }, checkInterval);

//     AudioRecord.on("data", (chunk) => {
//       // chunk is base64 PCM
//       const byteArray = Uint8Array.from(atob(chunk), (c) => c.charCodeAt(0));
//       let maxAmplitude = 0;
//       for (let i = 0; i < byteArray.length; i += 2) {
//         const sample = byteArray[i] | (byteArray[i + 1] << 8);
//         const amplitude = Math.abs(sample);
//         if (amplitude > maxAmplitude) maxAmplitude = amplitude;
//       }

//       if (maxAmplitude < silenceThreshold) {
//         silenceCounter += checkInterval;
//       } else {
//         silenceCounter = 0;
//       }
//     });
//   });
// };

export const recordAudioUntilSilence = async () => {
  const ok = await requestMediaPermissions();
  if (!ok) {
    Alert.alert("Permissions required");
    return null;
  }

  AudioRecord.init({
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    wavFile: "question.wav",
  });

  const silenceThreshold = 500; // amplitude threshold
  const minSilenceDuration = 1500; // 1.5s
  let lastSoundTime = Date.now();

  AudioRecord.start();
  console.log("[VAD] Recording started");

  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const elapsedSilence = Date.now() - lastSoundTime;
      if (elapsedSilence >= minSilenceDuration) {
        clearInterval(interval);
        try {
          const path = await AudioRecord.stop();
          console.log("[VAD] Recording stopped");
          resolve(Platform.OS === "android" ? "file://" + path : path);
        } catch (err) {
          reject(err);
        }
      }
    }, 100);
    if(!dataListenerAttached){
AudioRecord.on("data", (chunk) => {
  const buffer = Uint8Array.from(atob(chunk), c => c.charCodeAt(0));
  let maxAmplitude = 0;

  for (let i = 0; i < buffer.length; i += 2) {
    const sample = buffer[i] | (buffer[i + 1] << 8);
    const signedSample = sample >= 0x8000 ? sample - 0x10000 : sample;
    const amplitude = Math.abs(signedSample);
    if (amplitude > maxAmplitude) maxAmplitude = amplitude;
  }

  if (maxAmplitude > silenceThreshold) {
    lastSoundTime = Date.now();
    // console.log("[VAD] sound detected, amplitude:", maxAmplitude);
  }
});
dataListenerAttached=true;
  }
AudioRecord.removeAllListeners?.();
dataListenerAttached = false;



  });
};