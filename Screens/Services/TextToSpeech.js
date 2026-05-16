import Tts from "react-native-tts";

let listener = null;

export const speakText = (text, onFinish = null) => {
  Tts.stop();

  if (onFinish) {
    listener = Tts.addEventListener("tts-finish", () => {
      removeTtsListener();
      onFinish();
    });
  }

  Tts.speak(text);
};

export const removeTtsListener = () => {
  if (listener) {
    listener.remove();
    listener = null;
  }
};
