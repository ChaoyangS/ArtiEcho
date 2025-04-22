import React, { useState, useEffect } from "react"; 
import "./SearchPage.css";
import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import "../../styles/_global.css";
import "../../assets/backgroundstar7.png";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const [mode, setMode] = useState(params.get("mode") || "artist"); // Set initial search mode (default to "artist" if not specified in URL)
  const [query, setQuery] = useState(params.get("query") || ""); // Set initial query string if not specified in URL
  const [results, setResults] = useState([]); 

  useEffect(() => {
    if (query) {
      handleSearch(); // search based on query param if URL contains a query

    }
  }, []); // add for allow query for search through url

  const handleSearch = async () => {
    if (!query.trim()) return;

    const endpoint =
      mode === "artist"
        ? `http://localhost:3000/artwork-by-artist?artist=${encodeURIComponent(query)}`
        : mode === "artwork"
        ? `http://localhost:3000/artwork-by-title?title=${encodeURIComponent(query)}`
        : `http://localhost:3000/artwork-by-year?year=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(endpoint, {
        headers: {
          "X-API-Token": "artiecho",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Search failed");
        return; // prevent setting results to empty array
      }

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
          <button onClick={handleSearch}>
            <Search size={18} />
          </button>
        </div>

        <div className="mode-toggle">
          {["artist", "artwork", "year"].map((option) => (
            <div
              key={option}
              className={`mode-option ${mode === option ? "active" : ""}`}
              onClick={() => setMode(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="results-panel">
        <div className="space-background">
          {results.length === 0 ? (
            <p className="placeholder">
              Start typing to search the galaxy of art 🌌
            </p>
          ) : (
            results.map((item, index) => (
              <div className="art-card" key={index}>
                <Link to={`/artwork/${item.objectid}`} className="topten-link">
                  <h3>{item.artwork_title || "Untitled"}</h3>
                </Link>
                {/* We don't need to provide objectID to user
                <p>
                  <strong>ObjectID:</strong> {item.objectid || "Unknown"}
                </p>
                */}
                <p>
                  <strong>Artist:</strong> {item.artist_name || "Unknown"}
                </p>
                <p>
                  <strong>Time:</strong> {item.beginyear || "?"} –{" "}
                  {item.endyear || "?"}
                </p>
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
