import "./TrackItem.css";

export default function TrackItem({ item, onSelect }) {
  const image = item.image || "/placeholder.png";

  return (
    <div className="track-item" onClick={() => onSelect(item)}>
      <img src={image} alt="album" />

      <div>
        <h3>{item.title}</h3>
        <p>{item.artist}</p>
        <p>{item.date}</p>
      </div>
    </div>
  );
}