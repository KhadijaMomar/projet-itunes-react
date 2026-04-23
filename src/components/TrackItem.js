import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function TrackItem({ item, onSelect }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.text}>{item.artist}</Text>
        <Text style={styles.text}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#252525", padding: 10, borderRadius: 8, marginBottom: 10 },
  img: { width: 60, height: 60, borderRadius: 4 },
  info: { marginLeft: 15, flex: 1 },
  title: { color: "#fff", fontWeight: "bold" },
  text: { color: "#aaa", fontSize: 12 }
});