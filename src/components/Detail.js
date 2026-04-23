import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Audio } from 'expo-av';
import Rating from "./Rating";

export default function Detail({ item, onAdd, onRate }) {
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true, 
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    if (!item.preview) return;

    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: item.preview },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la lecture audio", error);
      setIsLoading(false);
    }
  }

  if (!item) return <Text style={styles.empty}>Sélectionnez un morceau</Text>;

  return (
    <View style={styles.content}>
      <Image source={{ uri: item.image }} style={styles.img} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      
      {item.preview && (
        <TouchableOpacity 
          style={[styles.btnPlay, isLoading && styles.btnDisabled]} 
          onPress={playSound}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>▶ Écouter l'extrait</Text>
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.btnAdd} onPress={() => onAdd(item)}>
        <Text style={styles.btnAddText}>＋ Ajouter à ma bibliothèque</Text>
      </TouchableOpacity>

      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>Ma note :</Text>
        <Rating value={item.rating || 0} onRate={(r) => onRate(item.id, r)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 15, backgroundColor: "#1e1e1e", borderRadius: 12, marginVertical: 10 },
  img: { width: "100%", height: 300, borderRadius: 12 },
  infoContainer: { marginVertical: 15 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  artist: { color: "#fa243c", fontSize: 16, marginTop: 5 },
  btnPlay: { backgroundColor: "#333", padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnAdd: { backgroundColor: "#fa243c", padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnAddText: { color: '#fff', fontWeight: 'bold' },
  ratingSection: { marginTop: 20, alignItems: 'center' },
  ratingLabel: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  empty: { color: "#aaa", textAlign: 'center', marginTop: 20 }
});