export default function Rating({ value, onRate }) {
  return (
    <div style={{ fontSize: "24px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          style={{ cursor: "pointer", color: star <= value ? "#ffc107" : "#e4e5e9" }}
        >
          {star <= value ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}