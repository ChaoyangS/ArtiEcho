import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";
import "./ArtworkPage.css";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [exhibitionHistory, setExhibitionHistory] = useState("");

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/artwork-by-id?id=${id}`, {
          headers: config.API_HEADERS,
        });
        const data = await res.json();
        setArtwork(data.length ? data[0] : null);
      } catch (err) {
        console.error("Error fetching artwork:", err);
      }
    };

    const fetchExhibitionHistory = async () => {
      try {
        const res = await fetch(`http://localhost:3000/artwork-exhibition-history?id=${id}`, {
          headers: {
            "X-API-Token": "artiecho",
          },
        });
        const data = await res.json();
        if (data.length > 0 && data[0].text) {
          setExhibitionHistory(data[0].text);
        }
      } catch (err) {
        console.error("Error fetching exhibition history:", err);
      }
    };

    fetchArtwork();
    fetchExhibitionHistory();
  }, [id]);

  if (!artwork) return <p className="loading">Loading...</p>;

  const timePeriod = artwork.beginyear && artwork.endyear
    ? `${artwork.beginyear} – ${artwork.endyear}`
    : artwork.beginyear || artwork.endyear || "?";

  return (
    <div className="artwork-detail-container">
      <div className="artwork-side-by-side">
        {/* main Image on the left */}
        {artwork.url && (
          <div className="artwork-image-wrapper">
            <img
              className="artwork-main-image"
              src={artwork.url.replace("!200,200", "!600,600")}
              alt={artwork.title}
            />
          </div>
        )}

        {/*  Description on the right */}
        <div className="artwork-header">
          <div className="artwork-info">
            <h1 className="artwork-title">{artwork.title}</h1>
            <div className="artwork-meta">
              <div className="meta-line"><span className="meta-label">Genre:</span>{artwork.genre || "Art Genre"}</div>
              <div className="meta-line"><span className="meta-label">Style:</span>{artwork.style || "Art Medium"}</div>
              <div className="meta-line"><span className="meta-label">Time period:</span>{timePeriod}</div>
              <div className="meta-line"><span className="meta-label">Artist:</span>{artwork.artist_name || "Unknown"}</div>
              <div className="meta-line"><span className="meta-label">Artist Nationality:</span>{artwork.nationality || "Unknown"}</div>

              <div className="meta-line">
                <span className="meta-label">Bibliorgraphy:</span>
                <div className="exhibition-history-text">{artwork.bibliography || "No record available"}</div>
              </div>

              <div className="meta-line">
                <span className="meta-label">Latest Exhibition:</span>
                <div className="exhibition-history-text">{exhibitionHistory || "No record available"}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
