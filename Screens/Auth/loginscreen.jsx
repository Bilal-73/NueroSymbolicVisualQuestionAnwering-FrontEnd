import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import ADMIN_CREDENTIALS  from "../../admin";
import { loginAPI } from "../Apis"

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   if (!username || !password) {
  //     Alert.alert("Error", "Please fill all fields");
  //     return;
  //   }

  //   if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) 
  //   {
  //     navigation.navigate("AdminHome"); 
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.post(`${CONFIG.LAN}/users/login`, {
  //       username,
  //       password,
  //     });

  //     if (res.data && res.data.id) {
  //       setPassword("");
  //       navigation.navigate("AssistantHome", { user: res.data }); 
  //          } else {
  //       Alert.alert("Login Failed", res.data.message || "Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("Login Failed", "Invalid username or password");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  


  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if ( username === ADMIN_CREDENTIALS.username &&password === ADMIN_CREDENTIALS.password)
    {
      navigation.navigate("AdminHome");
      return;
    }

  setLoading(true);

  try {
    //Login API Called here 
    const res = await loginAPI(username, password);

    if (res.data && res.data.id) {
      setPassword("");
      navigation.navigate("AssistantHome", { user: res.data });
    } else {
      Alert.alert("Login Failed", res.data?.message || "Invalid credentials");
    }
  } 
  catch (error) {
    console.error(error);
    Alert.alert("Login Failed", "Invalid username or password");
  } 
  finally {
    setLoading(false);
  }
};


return (
  <View style={styles.container}>
    {/* Sign Up button at top-right */}
    <TouchableOpacity 
      style={styles.signupButton} 
      onPress={() => navigation.navigate("AssistantSignup")}
    >
      <Text style={styles.signupText}>Sign Up</Text>
    </TouchableOpacity>

    <Image source={require("../../logos/logo.png")} style={styles.logo} />
    <Text style={styles.title}>SEE FOR ME</Text>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
        style={styles.input}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHide}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.loginText}>Login</Text>
      )}
    </TouchableOpacity>
  </View>
);

}

const styles = StyleSheet.create({
  signupButton: {
  position: "absolute",
  top: 40, // adjust as needed
  right: 20,
  backgroundColor: "#000",
  paddingHorizontal: 15,  // gives width
  paddingVertical: 10,    // gives height
  borderRadius: 25,       // rounded corners
  alignItems: "center",
  justifyContent: "center",
  elevation: 5,           // shadow for Android
},
signupText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},

  container: {
    flex: 1,
    backgroundColor: "#A2D5C6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: { width: 180, height: 120, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "#000", marginBottom: 20 },
  inputContainer: { width: "100%", marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, color: "#000" },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordInput: { flex: 1, height: 50 },
  showHide: { color: "blue", fontWeight: "bold", paddingHorizontal: 10 },
  loginButton: {
    backgroundColor: "#000",
    width: 180,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  loginText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
