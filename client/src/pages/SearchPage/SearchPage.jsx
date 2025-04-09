import React, { useState } from "react";
import "./SearchPage.css";

const SearchPage = () => {
  const [mode, setMode] = useState("artist"); // "artist" or "artwork"
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const endpoint =
      mode === "artist"
        ? `http://localhost:3000/artwork-by-artist?artist=${encodeURIComponent(query)}`
        : `http://localhost:3000/artwork-by-title?title=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(endpoint, {
        headers: {
          "X-API-Token": "artiecho",
        },
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="search-container">
      <div className="sidebar">
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search by ${mode}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>

        <div className="mode-toggle">
          <div
            className={`mode-option ${mode === "artist" ? "active" : ""}`}
            onClick={() => setMode("artist")}
          >
            Artist
          </div>
          <div
            className={`mode-option ${mode === "artwork" ? "active" : ""}`}
            onClick={() => setMode("artwork")}
          >
            Artwork
          </div>
        </div>
      </div>

      <div className="results-panel">
        <div className="space-background">
          {results.length === 0 ? (
            <p className="placeholder">Start typing to search the galaxy of art 🌌</p>
          ) : (
            results.map((item, index) => (
              <div className="art-card" key={index}>
                <h3>{item.artwork_title || "Untitled"}</h3>
                <p><strong>Artist:</strong> {item.artist_name || "Unknown"}</p>
                <p><strong>Time:</strong> {item.beginyear || "?"} – {item.endyear || "?"}</p>
                {item.url && (
                  <img
                    src={item.url.replace("!200,200", "!600,600")}
                    alt="Artwork"
                    className="art-image"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
