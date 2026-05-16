import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";


export default function SeeAllBlinds() {
  const [blinds, setBlinds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlinds = async () => {
    try {
      // const response = await axios.get(`${CONFIG.LAN}/users/blind-with-assistant`);
      const response=await getBlindsWithAssistantAPI()
      setBlinds(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch blinds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlinds();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.blindText}>
        👤 <Text style={styles.label}>Blind:</Text> {item.blind_name} ({item.blind_age}, {item.blind_gender})
      </Text>
      <Text style={styles.assistantText}>
        🤝 <Text style={styles.label}>Assistant:</Text> {item.assistant_name} (ID: {item.assistant_id})
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#1565c0" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Blinds & Assigned Assistants</Text>
      <FlatList
        data={blinds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 15,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blindText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  assistantText: {
    fontSize: 14,
    color: "#444",
  },
  label: {
    fontWeight: "700",
    color: "#1565c0",
  },
});
