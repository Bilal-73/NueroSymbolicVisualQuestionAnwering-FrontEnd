import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import Tts from "react-native-tts";
import {getRulesAPI} from "../Apis"

export default function AdminScreen({ navigation }) {
  
  const [rulesData, setRulesData] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchRules = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`${CONFIG.LAN}/nlp/get-rules`);
      const response =await getRulesAPI;
      setRulesData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    Tts.stop();
    Tts.speak("Welcome Admin! You are now on the CFG Manager Screen.");
    fetchRules();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.ruleText}>
        <Text style={styles.lhs}>{item.lhs}</Text> ➡ {item.rhs}
      </Text>

    </View>
  );

  return (
    <View style={styles.container}>
      {/* Settings Icon - Top Right */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image source={require("../../logos/settings.png")} style={styles.settingsIcon} />
      </TouchableOpacity>
      <View style={styles.imageRow}>
        <Image source={require("../../logos/ignore.png")} style={styles.mainAvatar} />
        <Image source={require("../../logos/logo.png")} style={styles.mainAvatar} />
      </View>

      <Text style={styles.title}>CFG Manager</Text>

      <View style={styles.wrapper}>
        <View style={styles.blackBox}>
          <GestureHandlerRootView style={styles.listWrapper}>
            <Text style={styles.header}>{rulesData.length} CFG Rules</Text>
            <FlatList
              data={rulesData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchRules} />
              }
            />
          </GestureHandlerRootView>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddRule")}
      >
        <Text style={styles.buttonText}>➕ Add New Rule</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1565c0" }]}
        onPress={() => navigation.navigate("AddVoc")}
      >
        <Text style={styles.buttonText}>📘 Add New Vocabulary</Text>
      </TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
    settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  settingsIcon: {
    width: 35,
    height: 35,
    tintColor: "#1565c0", // optional (blue shade)
  },

  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    paddingVertical: 30,
  },
  imageRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  mainAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0D47A1",
    marginTop: 10,
    marginBottom: 8,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
    lhs: {
    fontSize: 20,       
    fontWeight: "bold", 
    color: "#000",      
  },


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
  listWrapper: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  ruleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  editButton: {
    backgroundColor: "#8bb8e4",
    padding: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#75efaa",
    padding: 6,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#c83264",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
