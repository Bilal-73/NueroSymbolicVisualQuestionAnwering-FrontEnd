import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Tts from "react-native-tts";
import {validateNLPCFGAPI} from "../Apis"
export default function ValidateCFG() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleValidate = async () => {
    if (!question.trim()) {
      setResult("⚠️ Please enter a question first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      // const response = await axios.post(`${CONFIG.LAN}/nlp/validate`, {
      //   question: question
      // });

      const response=await validateNLPCFGAPI(question)

      console.log("API Response:", response.data);
      setResult(response.data.message || JSON.stringify(response.data));
      Tts.stop();
      Tts.speak("Given CFG is ", result);
    } catch (error) {
      console.error("Validation error:", error);
      setResult("❌ Error validating CFG. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate CFG</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your question..."
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" style={{ marginTop: 20 }} />
      ) : (
        result !== "" && <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "100%"
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  result: { marginTop: 20, fontSize: 16, color: "green", textAlign: "center" }
});
