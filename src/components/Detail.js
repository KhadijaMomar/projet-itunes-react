import Rating from "./Rating";
import "../App.css"; // Assure-toi que le chemin est bon pour remonter vers App.css

export default function Detail({ item, onAdd, onRate }) {
  // Message d'attente stylé avec les couleurs du Dark Mode
  if (!item) {
    return (
      <div className="detail-panel" style={{ color: "var(--text-dim)", textAlign: "center", marginTop: "20px" }}>
        <p>🎧 Sélectionnez un morceau pour voir les détails.</p>
      </div>
    );
  }

  return (
    <div className="detail-content">
      {/* Image avec ombre portée pour le relief */}
      <img 
        src={item.image} 
        alt={item.title} 
        style={{ 
          width: "100%", 
          borderRadius: "12px", 
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
          marginBottom: "20px" 
        }} 
      />

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.6rem", margin: "0 0 5px 0", color: "var(--text-main)" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "1.1rem", color: "var(--accent)", fontWeight: "bold", margin: "0" }}>
          {item.artist}
        </p>
        <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginTop: "5px" }}>
          Année de sortie : {item.date}
        </p>
      </div>

      {/* Lecteur audio stylisé */}
      {item.preview && (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "10px" }}>Extrait audio :</p>
          <audio controls src={item.preview} style={{ width: "100%" }}></audio>
        </div>
      )}

      {/* Actions : Bouton et Rating */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <button 
          onClick={() => onAdd(item)} 
          style={{ 
            width: "100%", 
            padding: "12px", 
            fontSize: "1rem", 
            cursor: "pointer" 
          }}
        >
          ＋ Ajouter à ma bibliothèque
        </button>
        
        <div style={{ 
          background: "rgba(255,255,255,0.03)", 
          padding: "15px", 
          borderRadius: "10px", 
          textAlign: "center" 
        }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "var(--text-dim)" }}>
            Ma note personnelle
          </p>
          <Rating
            value={item.rating || 0}
            onRate={(r) => onRate(item.id, r)}
          />
        </div>
      </div>
      
      {/* Espace vide final pour s'assurer que le scroll ne coupe pas le contenu en bas */}
      <div style={{ height: "30px" }}></div>
    </div>
  );
}