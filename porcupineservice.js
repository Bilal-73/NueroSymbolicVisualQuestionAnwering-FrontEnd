import { PorcupineManager } from "@picovoice/porcupine-react-native";
import { PermissionsAndroid, Platform, Alert } from "react-native";

let porcupineInstance = null;

export const requestMicPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
       
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Microphone permission required");
      return false;
    }
  }
  return true;
};
export const initPorcupine = async (
  accessKey,
  keywordPaths,
  wakeCallback
) => {
  if (!porcupineInstance) {
porcupineInstance = await PorcupineManager.fromKeywordPaths(
  ACCESS_KEY,
  KEYWORD_PATHS,
  (keywordIndex) => console.log("Wake word detected!", keywordIndex),
  { sensitivities: [0.8] }
);


  }
};

export const startPorcupine = async () => {
  if (porcupineInstance) {
    await porcupineInstance.start();
    console.log("🎧 Porcupine listening...");
  }
};

export const stopPorcupine = async () => {
  if (porcupineInstance) {
    await porcupineInstance.stop();
  }
};

export const destroyPorcupine = async () => {
  if (porcupineInstance) {
    await porcupineInstance.delete();
    porcupineInstance = null;
  }
};
