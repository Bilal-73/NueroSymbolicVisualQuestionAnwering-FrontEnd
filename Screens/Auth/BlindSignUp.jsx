// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import {createBlindAPI} from "../Apis"
// export default function BlindSignUp({ route, navigation }) {
//   const { assistant_id } = route.params;
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male"); // default Male
//   const [pic, setPic] = useState(null); // { uri, type, name }

//   // Pick image from gallery
//   const pickImage = () => {
//     launchImageLibrary({ mediaType: "photo" }, (response) => {
//       if (response.didCancel) return;
//       if (response.errorCode) {
//         Alert.alert("Error", response.errorMessage);
//         return;
//       }
//       const asset = response.assets[0];
//       setPic({
//         uri: asset.uri,
//         type: asset.type,
//         name: asset.fileName,
//       });
//     });
//   };

//   // Take photo from camera
//   const takePhoto = () => {
//     launchCamera({ mediaType: "photo" }, (response) => {
//       if (response.didCancel) return;
//       if (response.errorCode) {
//         Alert.alert("Error", response.errorMessage);
//         return;
//       }
//       const asset = response.assets[0];
//       setPic({
//         uri: asset.uri,
//         type: asset.type,
//         name: asset.fileName,
//       });
//     });
//   };

//   const handleCreateBlind = async () => {
//     if (!name || !age || !gender) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }
//     if (!pic) {
//       Alert.alert("Error", "Please select a profile picture");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("age", age);
//       formData.append("gender", gender);
//       formData.append("assistant_id", assistant_id);
//       formData.append("pic", {
//         uri: pic.uri,
//         type: pic.type,
//         name: pic.name,
//       });

//       // const response = await axios.post(`${CONFIG.LAN}/users/blinds/create`, formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       const response=await createBlindAPI(formData)

//       if (response.data.success) {
//         Alert.alert("Success", "Blind account created!");
//         navigation.navigate("Login");
//       } else {
//         Alert.alert("Error", "Failed to create Blind account");
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Blind Sign Up</Text>

//       <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
//       <TextInput style={styles.input} placeholder="Age" value={age} keyboardType="numeric" onChangeText={setAge} />

//       <Text style={styles.label}>Gender</Text>
//       <View style={styles.radioRow}>
//         {["Male", "Female"].map((g) => (
//           <TouchableOpacity key={g} style={styles.radioButton} onPress={() => setGender(g)}>
//             <View style={styles.radioOuter}>{gender === g && <View style={styles.radioInner} />}</View>
//             <Text style={styles.radioText}>{g}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Image Picker */}
//       <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
//         <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
//           <Text style={styles.imageText}>📁 Gallery</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
//           <Text style={styles.imageText}>📸 Camera</Text>
//         </TouchableOpacity>
//         {pic && <Image source={{ uri: pic.uri }} style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 25 }} />}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleCreateBlind}>
//         <Text style={styles.buttonText}>Create Blind Account</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
//   heading: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: "#fff" },
//   label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
//   radioRow: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 15 },
//   radioButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
//   radioOuter: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: "#007bff", alignItems: "center", justifyContent: "center" },
//   radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: "#007bff" },
//   radioText: { marginLeft: 6, fontSize: 16 },
//   button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   imageButton: { backgroundColor: "#c83264", padding: 10, borderRadius: 8, marginRight: 10 },
//   imageText: { color: "#fff", fontWeight: "600" },
// });


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ActivityIndicator } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { createBlindAPI } from "../Apis";

export default function BlindSignUp({ route, navigation }) {
  const { assistant_id } = route.params;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [pic, setPic] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
        return;
      }
      const asset = response.assets[0];
      setPic({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
    });
  };

  const takePhoto = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
        return;
      }
      const asset = response.assets[0];
      setPic({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
    });
  };

  const handleCreateBlind = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!name || !age || !gender) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (!pic) {
      Alert.alert("Error", "Please select a profile picture");
      return;
    }

    setIsSubmitting(true); // Start submission

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("assistant_id", assistant_id);
      formData.append("pic", {
        uri: pic.uri,
        type: pic.type,
        name: pic.name,
      });

      const response = await createBlindAPI(formData);

      if (response.data.success) {
        Alert.alert("Success", "Blind account created!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Failed to create Blind account");
        setIsSubmitting(false); // Re-enable if failed
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
      setIsSubmitting(false); // Re-enable on error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Blind Sign Up</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName}
        editable={!isSubmitting} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Age" 
        value={age} 
        keyboardType="numeric" 
        onChangeText={setAge}
        editable={!isSubmitting}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioRow}>
        {["Male", "Female"].map((g) => (
          <TouchableOpacity 
            key={g} 
            style={styles.radioButton} 
            onPress={() => setGender(g)}
            disabled={isSubmitting}
          >
            <View style={styles.radioOuter}>
              {gender === g && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
        <TouchableOpacity 
          style={styles.imageButton} 
          onPress={pickImage}
          disabled={isSubmitting}
        >
          <Text style={styles.imageText}>📁 Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.imageButton} 
          onPress={takePhoto}
          disabled={isSubmitting}
        >
          <Text style={styles.imageText}>📸 Camera</Text>
        </TouchableOpacity>
        {pic && (
          <Image 
            source={{ uri: pic.uri }} 
            style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 25 }} 
          />
        )}
      </View>

      <TouchableOpacity 
        style={[styles.button, isSubmitting && styles.buttonDisabled]} 
        onPress={handleCreateBlind}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Blind Account</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  radioRow: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 15 },
  radioButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioOuter: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: "#007bff", alignItems: "center", justifyContent: "center" },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: "#007bff" },
  radioText: { marginLeft: 6, fontSize: 16 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  imageButton: { backgroundColor: "#c83264", padding: 10, borderRadius: 8, marginRight: 10 },
  imageText: { color: "#fff", fontWeight: "600" },
});