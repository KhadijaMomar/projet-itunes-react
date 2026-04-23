import { View, TouchableOpacity, Text } from "react-native";

export default function Rating({ value, onRate }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)}>
          <Text style={{ fontSize: 30, color: star <= value ? "#ffc107" : "#444" }}>
            {star <= value ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}