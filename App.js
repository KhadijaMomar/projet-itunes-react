import { useState, useEffect } from "react";
import SearchBar from "./src/components/SearchBar";
import ResultsList from "./src/components/ResultsList";
import Library from "./src/components/Library";
import Detail from "./src/components/Detail";
import { searchItunes } from "./src/services/itunesApi";

function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [library, setLibrary] = useState([]);

  // Charger la bibliothèque au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("library");
    if (saved) setLibrary(JSON.parse(saved));
  }, []);

  // Sauvegarder dès que la bibliothèque change
  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  const handleSearch = async (term, type) => {
    const data = await searchItunes(term, type);
    setResults(data);
  };

  const addToLibrary = (item) => {
    if (!library.find((i) => i.id === item.id)) {
      setLibrary([...library, { ...item, rating: 0 }]);
    }
  };

  const rateItem = (id, rating) => {
    const updated = library.map((item) =>
      item.id === id ? { ...item, rating } : item
    );
    setLibrary(updated);
    
    // Mise à jour visuelle immédiate si l'item est ouvert dans Detail
    if (selected && selected.id === id) {
      setSelected({ ...selected, rating });
    }
  };

return (
  <div className="app-wrapper">
    <h1>My iTunes Seeker 🎵</h1>
    <SearchBar onSearch={handleSearch} />

    <div className="app-container">
      {/* Colonne 1 : Résultats */}
      <div className="scroll-panel">
        <h2>Résultats 🔍</h2>
        <ResultsList results={results} onSelect={setSelected} />
      </div>

      {/* Colonne 2 : Détail (Maintenant scrollable aussi !) */}
      <div className="scroll-panel">
        <h2>Détail 🎧</h2>
        <div className="detail-content">
          <Detail item={selected} onAdd={addToLibrary} onRate={rateItem} />
        </div>
      </div>

      {/* Colonne 3 : Bibliothèque */}
      <div className="scroll-panel">
        <h2>Ma bibliothèque 📚</h2>
        <Library library={library} onSelect={setSelected} />
      </div>
    </div>
  </div>
);
}

export default App;