/*
  Top Ten Artworks page.
*/

import React, { useEffect, useState } from "react";
import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import "./ToptenArtworkPage.css";

const ToptenArtworkPage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    console.log("Fetching artwork data...");
    fetch("http://localhost:3000/topten-artworks")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          title: item.title,
          artist: item.artist || "Unknown",
          image: item.image || "/placeholder.jpg", // fallback image path
        }));
        setArtworks(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch artworks:", err);
      });
  }, []);

  return (
    <div className="topten-artwork-page">
      {/* <ToptenNavbar />*/}
      {/* <h3>Top 10 Artworks by Genre</h3> */} {/*  Will consider move to navbar or somewhere */}
      <Topten title="Top 10 Artworks" items={artworks} category="Artworks" />
    </div>
  );
};

export default ToptenArtworkPage;