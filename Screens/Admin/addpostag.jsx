import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

import { addRuleAPI } from "../Apis";
// import { add } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
export default function AddPosTagScreen({ route, navigation }) {
  const { question, PosTags ,rule} = route.params;



  const handleSave = async () => {
    console.log("Saved Rule:", { question, PosTags, rule });

    try {

      // const response = await axios.post(`${CONFIG.LAN}/nlp/add-rule`, {
      //   question: question,
      // });

      const response=await addRuleAPI(question)
      console.log("Server response:", response.data.message);
      alert("Rule added successfully");
      navigation.goBack();

    } catch (error) {
      console.error("Error adding rule:", error);
      alert("Failed to add rule");
    }
  };





  return (
    <View style={styles.container}>
      {/* Rule at the top */}
      <Text style={styles.rule}>Rule: {rule}</Text>

      {/* Original Question */}
      <Text style={styles.question}>Question: {question}</Text>

      {/* POS Tag list */}
    <FlatList
      data={PosTags }
      keyExtractor={(item,index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.word}>{item.word}</Text>

          <Text style={styles.pos}>{item.pos}</Text>
        </View>
      )}
/>

      {/* Save Button */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  rule: { fontSize: 18, fontWeight: "bold", color: "green", marginBottom: 12 },
  question: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  word: { fontSize: 16 },
  pos: { fontSize: 16, fontWeight: "bold", color: "blue" },
});
