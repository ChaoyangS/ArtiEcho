import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ArtworkPage.css";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(`http://localhost:3000/artwork-by-id?id=${id}`, {
          headers: {
            "X-API-Token": "artiecho",
          },
        });
        const data = await res.json();
        setArtwork(data.length ? data[0] : null);
      } catch (err) {
        console.error("Error fetching artwork:", err);
      }
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) return <p className="loading">Loading...</p>;

  const timePeriod = artwork.beginyear && artwork.endyear
    ? `${artwork.beginyear} – ${artwork.endyear}`
    : artwork.beginyear || artwork.endyear || "?";

  return (
    <div className="artwork-detail-container">
      <div className="artwork-header">
        <div className="artwork-info">
          <h1 className="artwork-title">{artwork.title}</h1>
          
          <p className="artwork-meta">
            <strong>Genre:</strong> {artwork.genre || "Art Genre"} <br />
            <strong>Time period:</strong> {timePeriod} <br />
            <strong>Artist:</strong> {artwork.artist_name || "Unknown"} <br />
            <strong>Representative Genre of Art:</strong> {artwork.genre || "—"}
          </p>
        </div>
      </div>

      {artwork.url && (
        <div className="artwork-image-wrapper">
          <img
            className="artwork-main-image"
            src={artwork.url.replace("!200,200", "!600,600")}
            alt={artwork.title}
          />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailPage;
