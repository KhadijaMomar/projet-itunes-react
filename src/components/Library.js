import TrackItem from "./TrackItem";

export default function Library({ library, onSelect }) {
  return (
    <div>
      {library.length === 0 && <p>Aucun morceau sauvegardé</p>}

      {library.map((item) => (
        <TrackItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}