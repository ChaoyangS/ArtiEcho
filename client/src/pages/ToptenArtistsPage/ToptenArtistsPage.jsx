/*
  /topten-artists page, we use the Topten.jsx component here as well.
  We list the top ten artists with the most number of artworks and display their work randomly(random genre/style).
  We list the infomation in our database, also involved links to the related wiki page.
*/

import React, { useEffect, useState } from "react";
import Topten from "../../components/Topten/Topten";
import { config } from "../../config"; // 导入配置
import "./ToptenArtistsPage.css";

const ToptenArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {

    const fetchArtworks = async () => {
      try { 
        const response = await fetch(`${config.API_BASE_URL}/topten-artist`, {
          headers: config.API_HEADERS,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched artist data:", data);

        const formatted = data.Top_10_Artist.map((item) => {

          return {
            objectid: item.objectid,
            artist: item.artist_name || "Unknown",
            lifeSpan: item.display_lifespan,
            artworkCount: item.artwork_count,
            title: item.artwork_title,
            image: item.url ? item.url.replace("!200,200", "!600,600") : null,
          };
        });

        setArtists(formatted);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <div className="topten-artists-page">
      <Topten title="Top 10 Artists" items={artists} category="Artist" />
    </div>
  );
};

export default ToptenArtistsPage;