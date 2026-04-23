import { View, Text } from "react-native";
import TrackItem from "./TrackItem";

export default function Library({ library, onSelect }) {
  return (
    <View>
      {library.length === 0 && <Text>Aucun morceau sauvegardé</Text>}

      {library.map((item) => (
        <TrackItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}



