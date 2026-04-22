import TrackItem from "./TrackItem";

export default function ResultsList({ results, onSelect }) {
  return (
    <div>
      {results.map((item) => (
        <TrackItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}