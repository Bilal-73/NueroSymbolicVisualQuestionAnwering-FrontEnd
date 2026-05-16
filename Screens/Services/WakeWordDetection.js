
// export const listenForWakeWord = async () => {
//   const audioUri = await recordAudio();
//   if (!audioUri) return null;

//   const form = new FormData();
//   form.append("audio", {
//     uri: audioUri,
//     type: "audio/wav",
//     name: "wakeword.wav",
//   });

//   const res = await voiceCommandAPI(form);
//   return res?.data?.command || null;
// };

// import { recordAudio } from "./AudioRecording";
// import { voiceCommandAPI } from "../Apis";

// export const listenForWakeWord = async (duration = 5000) => {
//   const audioUri = await recordAudio(duration);
//   if (!audioUri) return null;

//   const form = new FormData();
//   form.append("audio", {
//     uri: audioUri,
//     type: "audio/wav",
//     name: "wakeword.wav",
//   });

//   const res = await voiceCommandAPI(form);
//   return res?.data?.command || null;
// };


import { recordAudio } from "./AudioRecording";
import { voiceCommandAPI } from "../Apis";


export const listenForWakeWord = async (duration = 4000) => {
  const audioUri = await recordAudio(duration);
  if (!audioUri) return null;

  const form = new FormData();
  form.append("audio", {
    uri: audioUri,
    type: "audio/wav",
    name: "wakeword.wav",
  });

  const res = await voiceCommandAPI(form);
  return res?.data?.command || null;
};
