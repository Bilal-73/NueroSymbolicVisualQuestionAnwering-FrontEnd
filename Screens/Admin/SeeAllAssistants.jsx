import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import CONFIG from "../../ipconfig";
import {getAllAssistantsAPI} from "../Apis"

export default function SeeAllAssistants() {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssistants = async () => {
    try {
      // const response = await axios.get(`${CONFIG.LAN}/users/assis`); 

      const response=await getAllAssistantsAPI();
      console.log("API Response:", response.data); // debug
      setAssistants(response.data);
    } catch (err) {
      console.error("Error fetching assistants:", err.message);
      Alert.alert("Error", "Failed to fetch assistants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Age: {item.age}</Text>
      <Text>Gender: {item.gender}</Text>
      <Text>Username: {item.username}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧑‍🤝‍🧑 All Assistants</Text>
      {assistants.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No assistants found</Text>
      ) : (
        <FlatList
          data={assistants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
});
