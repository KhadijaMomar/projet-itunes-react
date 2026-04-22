import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("song");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (term.trim()) onSearch(term, type);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Nom d'artiste ou de chanson..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />

      <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "8px" }}>
        <option value="song">Titre</option>
        <option value="artist">Artiste</option>
      </select>

      <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
        Rechercher
      </button>
    </form>
  );
}