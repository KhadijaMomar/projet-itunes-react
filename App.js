import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "./src/components/SearchBar";
import ResultsList from "./src/components/ResultsList";
import Library from "./src/components/Library";
import Detail from "./src/components/Detail";
import { searchItunes } from "./src/services/itunesApi";

export default function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("library");
      if (saved) setLibrary(JSON.parse(saved));
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  const handleSearch = async (term, type) => {
    const data = await searchItunes(term, type);
    setResults(data);
  };

  const addToLibrary = (item) => {
    if (!library.find((i) => i.id === item.id)) {
      setLibrary([...library, { ...item, rating: 0 }]);
    }
  };

  const rateItem = (id, rating) => {
    const updated = library.map((item) =>
      item.id === id ? { ...item, rating } : item
    );
    setLibrary(updated);
    if (selected && selected.id === id) setSelected({ ...selected, rating });
  };

  return (
    <SafeAreaView style={styles.appWrapper}>
      <Text style={styles.h1}>My iTunes Seeker 🎵</Text>
      <SearchBar onSearch={handleSearch} />
      
      <ScrollView style={styles.container}>
        <Text style={styles.h2}>Détail 🎧</Text>
        <Detail item={selected} onAdd={addToLibrary} onRate={rateItem} />

        <Text style={styles.h2}>Résultats 🔍</Text>
        <ResultsList results={results} onSelect={setSelected} />

        <Text style={styles.h2}>Ma bibliothèque 📚</Text>
        <Library library={library} onSelect={setSelected} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appWrapper: { flex: 1, backgroundColor: "#121212", padding: 10 },
  h1: { fontSize: 24, color: "#fff", fontWeight: "bold", textAlign: "center", margin: 20 },
  h2: { fontSize: 20, color: "#fa243c", fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  container: { flex: 1 }
});