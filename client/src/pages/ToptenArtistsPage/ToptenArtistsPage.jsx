/*
  Top Ten Artists page, we use the Topten.jsx component here as well.
*/

import React, { useEffect, useState } from "react";
// import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import "./ToptenArtistsPage.css";

const ToptenArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {

    const fetchArtworks = async () => {
      try { 
        const response = await fetch(`http://localhost:3000/topten-artist`, {
          headers: {
            "X-API-Token": "artiecho",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched artist data:", data);

        const formatted = data.Top_10_Artist.map((item) => {

          return {
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
      {/*<ToptenNavbar />*/}
      {/* <h3>Top 10 Artists</h3> */} {/*  Will consider move to navbar or somewhere */}
      <Topten title="Top 10 Artists" items={artists} category="Artist" />
    </div>
  );
};

export default ToptenArtistsPage;