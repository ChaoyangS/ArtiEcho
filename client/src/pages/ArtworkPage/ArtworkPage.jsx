import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";
import "./ArtworkPage.css";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

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

    fetchArtwork();
  }, [id]);

  if (!artwork) return <p className="loading">Loading...</p>;

  const timePeriod = artwork.beginyear && artwork.endyear
    ? `${artwork.beginyear} – ${artwork.endyear}`
    : artwork.beginyear || artwork.endyear || "?";

  return (
    <div className="artwork-detail-container">
      <div className="artwork-side-by-side"> {/* adding a container here to arrage image and description */}
        
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
            </div>
          </div>
        </div>

      </div>
</div>
  );
};

export default ArtworkDetailPage;
