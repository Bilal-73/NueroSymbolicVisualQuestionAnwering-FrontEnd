import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import CONFIG from "../../ipconfig";
export default function InteractionLog({ route }) {
  const { assistant_id } = route.params; // get assistant_id from route params
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.post(
          `${CONFIG.LAN}/history/getHistory/${assistant_id}`
        );
      
const data = response.data.map(item => ({
  id: item.id, // unique key
  question: item.question,
  answer: item.answer,
  image: require("../../logos/ignore.png"), // always use placeholder image
}));

        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [assistant_id]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.question}>Q: {item.question}</Text>
        <Text style={styles.answer}>A: {item.answer}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#0D47A1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../logos/log.png")} style={styles.topIcon} />
      <Text style={styles.header}>Interaction Log</Text>

      <View style={styles.wrapper}>
        <View style={styles.blackBox}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList
              data={logs}
              renderItem={renderItem}
              
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    paddingVertical: 20,
  },
  topIcon: { width: 80, height: 80, marginBottom: 8 },
  header: { fontSize: 24, fontWeight: "700", color: "#0D47A1", marginBottom: 10 },
  wrapper: { width: "100%", alignItems: "center", flex: 1 },
  blackBox: {
    backgroundColor: "#212121",
    width: "90%",
    borderRadius: 20,
    flex: 1,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  listContent: { paddingBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: { width: 55, height: 55, borderRadius: 10, marginRight: 12, backgroundColor: "#eee" },
  details: { flex: 1 },
  question: { fontSize: 15, fontWeight: "600", color: "#000", marginBottom: 4 },
  answer: { fontSize: 14, color: "#444" },
});
