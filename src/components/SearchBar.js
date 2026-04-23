import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("song");

  return (
    <View style={styles.container}>
     
      <View style={styles.searchRow}>
        <TextInput 
          style={styles.input} 
          placeholder="Rechercher un morceau..." 
          placeholderTextColor="#666"
          value={term}
          onChangeText={setTerm}
        />
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={() => onSearch(term, type)}
        >
          
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterBtn, type === "song" && styles.activeFilter]} 
          onPress={() => setType("song")}
        >
          <Text style={[styles.filterText, type === "song" && styles.activeText]}>Titre</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterBtn, type === "artist" && styles.activeFilter]} 
          onPress={() => setType("artist")}
        >
          <Text style={[styles.filterText, type === "artist" && styles.activeText]}>Artiste</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchButton: {
    backgroundColor: "#fa243c", 
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  iconText: {
    fontSize: 20,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  activeFilter: {
    borderColor: "#fa243c",
    backgroundColor: "rgba(250, 36, 60, 0.1)",
  },
  filterText: {
    color: "#aaa",
    fontWeight: "600",
  },
  activeText: {
    color: "#fa243c",
  }
});