import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { requestMediaPermissions } from "./Permissions";

export const pickImagesFromGallery = async (limit = 1) => {
  const res = await launchImageLibrary({
    mediaType: "photo",
    selectionLimit: limit,
  });

  if (res.didCancel) return null;
  if (res.errorCode) throw res;

  return res.assets;
};

export const takePhotoFromCamera = async () => {
  const ok = await requestMediaPermissions();
  if (!ok) return null;

  const res = await launchCamera({
    mediaType: "photo",
    cameraType: "back",
    saveToPhotos: false,
  });

  if (res.didCancel) return null;
  if (res.errorCode) throw res;

  return res.assets?.[0];
};