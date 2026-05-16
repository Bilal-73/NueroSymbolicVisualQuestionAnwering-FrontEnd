// import { PermissionsAndroid, Platform, Alert } from "react-native";

// export const requestCameraStoragePermissions = async () => {
//   if (Platform.OS !== "android") return true;

//   const granted = await PermissionsAndroid.requestMultiple([
//     PermissionsAndroid.PERMISSIONS.CAMERA,
//     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//   ]);

//   const ok =
//     granted[PermissionsAndroid.PERMISSIONS.CAMERA] === "granted" &&
//     granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === "granted";

//   if (!ok) {
//     Alert.alert(
//       "Permission required",
//       "Camera and storage permissions are required"
//     );
//   }

//   return ok;
// };

// export const requestMicCameraPermissions = async () => {
//   if (Platform.OS !== "android") return true;

//   const mic = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
//   );
//   const cam = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.CAMERA
//   );

//   return (
//     mic === PermissionsAndroid.RESULTS.GRANTED &&
//     cam === PermissionsAndroid.RESULTS.GRANTED
//   );
// };


import { PermissionsAndroid, Platform, Alert } from "react-native";
import { Camera } from "react-native-vision-camera";

export const requestMediaPermissions = async () => {
  if (Platform.OS !== "android") return true;

  const permissions = [];

  // Image permissions
  if (Platform.Version >= 33) {
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
  } else {
    permissions.push(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
  }

  // Camera permission
  permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);

  // Microphone permission
  permissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

  const granted = await PermissionsAndroid.requestMultiple(permissions);

  const allGranted = permissions.every(
    (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
  );

  if (!allGranted) {
    Alert.alert(
      "Permission required",
      "Camera, microphone, and storage permissions are required."
    );
  }

  return allGranted;
};

export const requestVisionCameraPermission = async () => {
  const status = await Camera.requestCameraPermission();

  if (status !== "authorized") {
    Alert.alert(
      "Camera permission required",
      "Camera access is required for vision features."
    );
    return false;
  }

  return true;
};


  // 🔹 Storage / Media
  export const requestAllPermissions = async () => {
  // iOS automatically handles permissions in Info.plist
  if (Platform.OS !== "android") return true;

  const permissions = [];

  // 🔹 Storage / Media
  if (Platform.Version >= 33) {
    // Android 13+
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO); // optional if videos are used
  } else {
    // Android 12 and below
    permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  }

  // 🔹 Camera
  permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);

  // 🔹 Microphone
  permissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Check if all permissions are granted
    const allGranted = permissions.every(
      (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
    );

    if (!allGranted) {
      // Show alert and offer to open settings
      Alert.alert(
        "Permissions required",
        "Camera, microphone, and storage permissions are required for this app.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: PermissionsAndroid.openSettings },
        ]
      );
      return false;
    }

    return true;
  } catch (err) {
    console.log("Permission request error:", err);
    return false;
  }
};