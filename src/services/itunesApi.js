const BASE_URL = "https://itunes.apple.com/search";

const processTrack = (item) => ({
  id: item.trackId ? item.trackId.toString() : (item.artistId + item.trackName), 
  title: item.trackName || "Titre inconnu",
  artist: item.artistName || "Artiste inconnu",
  image: item.artworkUrl100 ? item.artworkUrl100.replace("100x100", "400x400") : null,
  preview: item.previewUrl,
  date: item.releaseDate ? new Date(item.releaseDate).getFullYear().toString() : "N/A",
});

export const searchItunes = async (term, type) => {
  try {
    const attribute = type === "artist" ? "artistTerm" : "trackTerm";
    const url = `${BASE_URL}?term=${encodeURIComponent(term)}&entity=song&attribute=${attribute}&limit=25`;
    const response = await fetch(url);
    const result = await response.json();
    return result.results.map(processTrack);
  } catch (error) {
    return [];
  }
};