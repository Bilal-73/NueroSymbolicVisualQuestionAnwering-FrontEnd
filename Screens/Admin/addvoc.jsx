import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { addVocabularyAPI } from "../Apis";

export default function AddVocScreen()
{
  const [posTag, setPosTag] = useState("");
  const [word, setWord] = useState("");
  
const handleSave = async () => {
  try {
    // const resp = await axios.post(`${CONFIG.LAN}/nlp/add-vocabulary`, { posTag, word });
    const resp=await addVocabularyAPI(posTag,word)
    if (resp.data.message === "Saved") {
      alert("Vocabulary added successfully");
      setPosTag("");
      setWord("");
    } else {
      alert("Failed to add vocabulary: " + resp.data.message);
    }
  } catch (error) {
    console.error("Error saving vocabulary:", error);
    alert("Error saving vocabulary");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter POS Tag</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter POS Tag"
        value={posTag}
        onChangeText={setPosTag}
      />
      <Text style={styles.label}>Enter Word</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Word"
        value={word}
        onChangeText={setWord}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 },
});
