import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import {checkUsernameAPI,createAssistantAPI} from "../Apis"
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function AssistantSignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(null); // { uri, type, name }

  // Pick image from gallery
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

  // Take photo from camera
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

  const handleNext = async () => {
    if (!name || !age || !username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!pic) {
      Alert.alert("Error", "Please select a profile picture");
      return;
    }

    try {
      // Check username availability
      // const res = await axios.post(`${CONFIG.LAN}/users/check-username`, { username });
      const res=await checkUsernameAPI(username)
      if (!res.data.available) {
        Alert.alert("Error", "Username is already taken");
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("pic", {
        uri: pic.uri,
        type: pic.type,
        name: pic.name,
      });

      // const response = await axios.post(`${CONFIG.LAN}/users/assis/create`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      const response=await createAssistantAPI(formData)

      if (response.data && response.data.id) {
        Alert.alert("Success", "Assistant account created!");
        navigation.navigate("BlindSignUp", { assistant_id: response.data.id });
      } else {
        Alert.alert("Error", "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistant Signup</Text>

      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Age" style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioRow}>
        {["Male", "Female"].map((g) => (
          <TouchableOpacity key={g} style={styles.radioButton} onPress={() => setGender(g)}>
            <View style={styles.radioOuter}>{gender === g && <View style={styles.radioInner} />}</View>
            <Text style={styles.radioText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Image Picker */}
      <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageText}>📁 Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <Text style={styles.imageText}>📸 Camera</Text>
        </TouchableOpacity>
        {pic && <Image source={{ uri: pic.uri }} style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 25 }} />}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, backgroundColor: "#fff", marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  radioRow: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 15 },
  radioButton: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioOuter: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: "#1565c0", alignItems: "center", justifyContent: "center" },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: "#1565c0" },
  radioText: { marginLeft: 6, fontSize: 16 },
  nextButton: { backgroundColor: "#1565c0", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  imageButton: { backgroundColor: "#c83264", padding: 10, borderRadius: 8, marginRight: 10 },
  imageText: { color: "#fff", fontWeight: "600" },
});
