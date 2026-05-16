// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image, StyleSheet } from "react-native";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { createContactWithPicsAPI } from "../Apis";
// import { PermissionsAndroid, Platform } from 'react-native';

// export default function AddPersonScreen({ route }) {
//   const { blind_id } = route.params;
//   const [name, setName] = useState("");
//   const [relation, setRelation] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [images, setImages] = useState([]);

//   // const pickFromGallery = () => {
//   //   launchImageLibrary({ mediaType: "photo", selectionLimit: 0 }, (response) => {
//   //     if (response.assets) {
//   //       setImages(prev => [...prev, ...response.assets.map(a => a.uri)]);
//   //     }
//   //   });
//   // };

//   // const takePhoto = () => {
//   //   launchCamera({ mediaType: "photo" }, (response) => {
//   //     if (response.assets) {
//   //       setImages(prev => [...prev, ...response.assets.map(a => a.uri)]);
//   //     }
//   //   });
//   // };

  

// const requestPermissions = async () => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     ]);

//     if (
//       granted['android.permission.CAMERA'] !== 'granted' ||
//       granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
//     ) {
//       Alert.alert("Permission required", "Camera and storage permissions are required!");
//       return false;
//     }
//   }
//   return true;
// };


// const pickFromGallery = async () => {
//   const allowed = await requestPermissions();
//   if (!allowed) return;

//   try {
//     const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 5 });
//     if (result.assets) setImages(prev => [...prev, ...result.assets.map(a => a.uri)]);
//   } catch (err) {
//     console.error("Gallery pick error:", err);
//   }
// };

// const takePhoto = async () => {
//   const allowed = await requestPermissions();
//   if (!allowed) return;

//   try {
//     const result = await launchCamera({ mediaType: "photo" });
//     if (result.assets) setImages(prev => [...prev, ...result.assets.map(a => a.uri)]);
//   } catch (err) {
//     console.error("Camera capture error:", err);
//   }
// };

//   const handleSave = async () => {
//     if (!name || !relation || !age) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("blind_id", blind_id);
//     formData.append("name", name);
//     formData.append("relation", relation);
//     formData.append("age", age);
//     formData.append("gender", gender);

//     images.forEach(uri => {
//       const filename = uri.split("/").pop();
//       const match = /\.(\w+)$/.exec(filename);
//       const type = match ? `image/${match[1]}` : `image`;
//       formData.append("images", { uri, name: filename, type });
//     });
    

//     try {
//       // const res = await axios.post(`${CONFIG.LAN}/contacts/create-with-pics`, formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       const res=await createContactWithPicsAPI(formData);

//       Alert.alert("Success", "Contact created with images!");
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Failed to create contact");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Add Person</Text>
//       <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
//       <TextInput placeholder="Relation" style={styles.input} value={relation} onChangeText={setRelation} />
//       <TextInput placeholder="Age" style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

//       <View style={styles.genderRow}>
//         {["Male", "Female", "Other"].map(g => (
//           <TouchableOpacity key={g} style={styles.genderButton} onPress={() => setGender(g)}>
//             <Text style={{ color: gender === g ? "#fff" : "#000" }}>{g}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.row}>
//         <TouchableOpacity style={styles.button} onPress={pickFromGallery}><Text>📂 Pick Images</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={takePhoto}><Text>📷 Take Photo</Text></TouchableOpacity>
//       </View>

//       <View style={styles.imageContainer}>
//         {images.map((uri, i) => <Image key={i} source={{ uri }} style={styles.imagePreview} />)}
//       </View>

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveText}>💾 Save</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#E3F2FD" },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0D47A1", textAlign: "center" },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, backgroundColor: "#fff", marginBottom: 12 },
//   row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
//   button: { flex: 1, padding: 12, marginHorizontal: 5, backgroundColor: "#1565c0", borderRadius: 10, alignItems: "center" },
//   imageContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
//   imagePreview: { width: 80, height: 80, borderRadius: 8 },
//   saveButton: { backgroundColor: "#c83264", padding: 15, borderRadius: 12, alignItems: "center" },
//   saveText: { color: "#fff", fontSize: 18, fontWeight: "600" },
//   genderRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
//   genderButton: { padding: 10, borderRadius: 10, backgroundColor: "#1565c0" },
// });


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image, StyleSheet, ActivityIndicator } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { createContactWithPicsAPI } from "../Apis";
import { PermissionsAndroid, Platform } from 'react-native';

export default function AddPersonScreen({ route }) {
  const { blind_id } = route.params;
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] !== 'granted' ||
        granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
      ) {
        Alert.alert("Permission required", "Camera and storage permissions are required!");
        return false;
      }
    }
    return true;
  };

  const pickFromGallery = async () => {
    const allowed = await requestPermissions();
    if (!allowed) return;

    try {
      const result = await launchImageLibrary({ 
        mediaType: "photo", 
        selectionLimit: 5 
      });
      
      if (result.didCancel) return;
      
      if (result.assets) {
        // Store full asset info, not just URI
        setImages(prev => [...prev, ...result.assets]);
      }
    } catch (err) {
      console.error("Gallery pick error:", err);
      Alert.alert("Error", "Failed to pick images");
    }
  };

  const takePhoto = async () => {
    const allowed = await requestPermissions();
    if (!allowed) return;

    try {
      const result = await launchCamera({ mediaType: "photo" });
      
      if (result.didCancel) return;
      
      if (result.assets) {
        // Store full asset info, not just URI
        setImages(prev => [...prev, ...result.assets]);
      }
    } catch (err) {
      console.error("Camera capture error:", err);
      Alert.alert("Error", "Failed to capture photo");
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!name || !relation || !age) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Error", "Please add at least one image");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("blind_id", blind_id);
      formData.append("name", name);
      formData.append("relation", relation);
      formData.append("age", age);
      formData.append("gender", gender);

      // Append all images with proper structure
      images.forEach((asset, index) => {
        const imageData = {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
        };
        formData.append("images", imageData);
      });

      console.log("Submitting contact with", images.length, "images");

      const res = await createContactWithPicsAPI(formData);

      if (res.data.success) {
        Alert.alert("Success", "Contact created with images!");
        // Clear form after success
        setName("");
        setRelation("");
        setAge("");
        setGender("Male");
        setImages([]);
      } else {
        Alert.alert("Error", res.data.message || "Failed to create contact");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Error", "Failed to create contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Person</Text>
      
      <TextInput 
        placeholder="Name" 
        style={styles.input} 
        value={name} 
        onChangeText={setName}
        editable={!isSubmitting}
      />
      <TextInput 
        placeholder="Relation" 
        style={styles.input} 
        value={relation} 
        onChangeText={setRelation}
        editable={!isSubmitting}
      />
      <TextInput 
        placeholder="Age" 
        style={styles.input} 
        keyboardType="numeric" 
        value={age} 
        onChangeText={setAge}
        editable={!isSubmitting}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderRow}>
        {["Male", "Female", "Other"].map(g => (
          <TouchableOpacity 
            key={g} 
            style={[
              styles.genderButton,
              gender === g && styles.genderButtonActive
            ]} 
            onPress={() => setGender(g)}
            disabled={isSubmitting}
          >
            <Text style={{ color: gender === g ? "#fff" : "#000" }}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={pickFromGallery}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>📂 Pick Images</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={takePhoto}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>📷 Take Photo</Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((asset, i) => (
            <View key={i} style={styles.imageWrapper}>
              <Image source={{ uri: asset.uri }} style={styles.imagePreview} />
              {!isSubmitting && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeImage(i)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]} 
        onPress={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveText}>💾 Save Contact</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#E3F2FD" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0D47A1", textAlign: "center" },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    padding: 12, 
    backgroundColor: "#fff", 
    marginBottom: 12 
  },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#0D47A1" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  button: { 
    flex: 1, 
    padding: 12, 
    marginHorizontal: 5, 
    backgroundColor: "#1565c0", 
    borderRadius: 10, 
    alignItems: "center" 
  },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontWeight: "600" },
  imageContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 10, 
    marginBottom: 20,
    marginTop: 10
  },
  imageWrapper: { position: "relative" },
  imagePreview: { width: 80, height: 80, borderRadius: 8 },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f44336",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: { 
    backgroundColor: "#c83264", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center",
    marginTop: 10
  },
  saveButtonDisabled: { backgroundColor: "#999" },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  genderRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  genderButton: { 
    padding: 10, 
    borderRadius: 10, 
    backgroundColor: "#90CAF9",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center"
  },
  genderButtonActive: { backgroundColor: "#1565c0" },
});