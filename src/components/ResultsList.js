import { View } from "react-native";
import TrackItem from "./TrackItem";

export default function ResultsList({ results, onSelect }) {
  return (
    <View>
      {results && results.map((item) => (
        <TrackItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </View>
  );
}