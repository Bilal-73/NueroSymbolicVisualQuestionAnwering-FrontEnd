

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import CONFIG from "../../ipconfig";
import Tts from "react-native-tts";
import { getAssistantBlindsAPI} from "../Apis"

export default function AssistantScreen({ route, navigation }) {
  const { user } = route.params;
  const [blinds, setBlinds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlind, setSelectedBlind] = useState(null);

  useEffect(() => {

    const fetchBlinds = async () => 
      {
        
      Tts.stop();
      Tts.speak(`Welcome ${user.name}! You are now on the Assistant Screen.`);
      try {
        const res=await getAssistantBlindsAPI(user.id)
        // const res = await axios.get(`${CONFIG.LAN}/users/assistant/${user.id}/blinds`);
        const blindsData = res.data;

        // Convert blind pic paths to proper URLs
        const blindsWithContacts = await Promise.all(
          blindsData.map(async (blind) => {
            // Convert backslashes to forward slashes and prepend CONFIG.LAN
            const blindPicUri = `${CONFIG.LAN}/${blind.pic.replace(/\\/g, "/")}`;

            // Fetch contacts
            const contactsRes = await axios.get(`${CONFIG.LAN}/contacts/user/${blind.id}`);
            // const contactsRes=await getContactsByBlindAPI(blind.id)
const rawContacts = contactsRes.data;

// Deduplicate by contact id (keep first occurrence)
  const uniqueContactsMap = new Map();

  rawContacts.forEach(contact => {
    if (!uniqueContactsMap.has(contact.id)) {
      uniqueContactsMap.set(contact.id, contact);
    }
  });

  const contacts = Array.from(uniqueContactsMap.values());

            
            return { ...blind, contacts, pic: blindPicUri };
          })
        );

        setBlinds(blindsWithContacts);
        if (blindsWithContacts.length > 0) setSelectedBlind(blindsWithContacts[0]);

        // Update assistant pic
        user.pic = `${CONFIG.LAN}/${user.pic.replace(/\\/g, "/")}`;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlinds();
  }, [user.id]);

  // const renderContact = ({ item }) => (
  //   <View style={styles.card}>
      
  //   <Image
  //     source={item.pic ? { uri: `${CONFIG.LAN}/${item.pic.replace(/\\/g, "/")}` } : require("../../logos/ignore.png")}
  //     style={styles.smallAvatar}
  //   />

  //     <View style={styles.details}>
  //       <Text style={styles.name}>{item.name}</Text>
  //       <Text style={styles.detail}>ID: {item.id}</Text>
  //       <Text style={styles.detail}>Relation: {item.relation}</Text>
  //       <Text style={styles.detail}>Age: {item.age}</Text>
  //       <Text style={styles.detail}>Gender: {item.gender} </Text>
  //     </View>
  //   </View>
  // );


    const renderContact = ({ item }) => {
    // If pics is an array → take first image
    const contactPic =
      Array.isArray(item.pic) && item.pic.length > 0
        ? `${CONFIG.LAN}/${item.pic[0].replace(/\\/g, "/")}`
        : item.pic
        ? `${CONFIG.LAN}/${item.pic.replace(/\\/g, "/")}`
        : null;

    return (
      <View style={styles.card}>
        <Image
          source={
            contactPic
              ? { uri: contactPic }
              : require("../../logos/ignore.png")
          }
          style={styles.smallAvatar}
        />

        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detail}>ID: {item.id}</Text>
          <Text style={styles.detail}>Relation: {item.relation}</Text>
          <Text style={styles.detail}>Age: {item.age}</Text>
          <Text style={styles.detail}>Gender: {item.gender}</Text>
        </View>
      </View>
    );
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text>Loading blinds and contacts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Compact Top Container */}
<View style={styles.topContainer}>
  {/* Assistant Info */}
  <View style={styles.infoSection}>
  <Image
    source={{ uri: user.pic }}
    style={styles.smallAvatar}
  />


    <View style={{ marginLeft: 10 }}>
      <Text style={styles.infoTitle}>Assistant</Text>
      <Text style={styles.infoText}>{user.name}</Text>
      <Text style={styles.infoText}>{user.age} yrs</Text>
      <Text style={styles.infoText}>{user.gender}</Text>
    </View>
  </View>

  {/* Assigned Blind Info */}
  {selectedBlind && (
    <View style={[styles.infoSection, { marginLeft: 20 }]}>
  <Image
    source={{ uri: selectedBlind.pic }}
    style={styles.smallAvatar}
  />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.infoTitle}>Blind</Text>
        <Text style={styles.infoText}>{selectedBlind.name}</Text>
        <Text style={styles.infoText}>ID: {selectedBlind.id}</Text>
        <Text style={styles.infoText}>{selectedBlind.age} yrs</Text>
        <Text style={styles.infoText}>{selectedBlind.gender}</Text>
      </View>
    </View>
  )}
</View>


      <View style={styles.wrapper}>
        <View style={styles.blackBox}>
          <Text style={styles.header}>Contacts</Text>
          {selectedBlind && selectedBlind.contacts.length > 0 ? (
            <FlatList
              data={selectedBlind.contacts}
              renderItem={renderContact}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noContacts}>No contacts for this blind.</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddPerson",selectedBlind ? { blind_id: selectedBlind.id } : null)}
      >
        <Text style={styles.buttonText}>✅ Add Person</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1565c0" }]}
        onPress={() => navigation.navigate("InteractionLog", { assistant_id: user.id })}
      >
        <Text style={styles.buttonText}>📖 Interaction Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD", paddingVertical: 15, paddingHorizontal: 15 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

topContainer: {
  flexDirection: "row",
  justifyContent: "flex-start", // changed from space-between   
  backgroundColor: "#fff",
  borderRadius: 15,
  padding: 10,
  marginBottom: 15,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 4,
},

infoSection: {
  flexDirection: "row",
  alignItems: "center",
},
smallAvatar: {
  width: 70,
  height: 70,
  borderRadius: 35,
},

  infoTitle: { fontSize: 14, fontWeight: "700", marginBottom: 2, color: "#0D47A1" },
  infoText: { fontSize: 13, color: "#333", marginBottom: 1 },

  wrapper: { flex: 1, width: "100%", alignItems: "center" },
  blackBox: {
    backgroundColor: "#212121",
    width: "100%",
    borderRadius: 20,
    flex: 1,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  header: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 12 },
  noContacts: { color: "#fff", textAlign: "center", fontStyle: "italic", marginTop: 20 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: { width: 50, height: 50, marginRight: 12, borderRadius: 25, backgroundColor: "#e0e0e0" },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "#000" },
  detail: { fontSize: 13, color: "#666", marginTop: 2 },

  button: {
    backgroundColor: "#c83264ff",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  listContent: { paddingBottom: 20 },
});
