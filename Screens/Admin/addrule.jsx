import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";   // ✅ import axios
import CONFIG from "../../ipconfig";

export default function AddRuleScreen({ navigation }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${CONFIG.LAN}/nlp/get-pos-tags`, { question });

      const data = response.data;
      console.log("POS Tags (words):", data.PosTags);  // ✅ clearer log
      console.log("POS Rule sequence:", data.Rule);

      navigation.navigate("AddPosTag", { 
        question, 
        PosTags: data.PosTags, 
        rule: data.Rule 
      });
    } catch (error) {
      console.error("Error fetching POS tags:", error);
      alert("Failed to fetch POS tags. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a question..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Add POS Tag" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
