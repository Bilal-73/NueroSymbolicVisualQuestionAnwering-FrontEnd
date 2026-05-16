import Tts from "react-native-tts";

let finishSub = null;

export const speak = (text, onFinish = null) => {
  Tts.stop();

  if (finishSub) {
    finishSub.remove();
    finishSub = null;
  }

  if (onFinish) {
    finishSub = Tts.addEventListener("tts-finish", () => {
      finishSub?.remove();
      finishSub = null;
      onFinish();
    });
  }

  Tts.speak(text);
};

export const stopTTS = () => {
  Tts.stop();
  finishSub?.remove();
  finishSub = null;
};
