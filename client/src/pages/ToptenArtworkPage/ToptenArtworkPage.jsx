/*
  Top Ten Artworks page(by style, then by genre).
*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import "./ToptenArtworkPage.css";

const ToptenArtworkPage = () => {
  const [artworks, setArtworks] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const style = queryParams.get("style") || "Impressionist";
  const subclass = queryParams.get("subclass") || "paint";
  useEffect(() => {

    const fetchArtworks = async () => {
      // style = ("Impressionist", "Post-Impressionist", "Renaissance", "Abstract Expressionist", "Realist", 
      //          "Baroque", "Romantic", "Neoclassic", "Rococo", "Surrealist", "Gothic", "Rococo", "Minimalist")

      // subclass = ("paint", "drawing", "sculpture", "print", "decorative art", "photograph")
      // example as most recent ten-paint-artworks of Impressionist
      //const style = "Impressionist"; 
      //const subclass = "paint";
      try { /* Fetch data for Impression style ('drawing', 'sculpture', 'photograph',  'print', 'paint', 'decorative art')*/
        const response = await fetch(`http://localhost:3000/artwork-by-style?style=${encodeURIComponent(style)}&subclass=${encodeURIComponent(subclass)}`, {
          headers: {
            "X-API-Token": "artiecho",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const formatted = data.map((item) => {
          /** Get valid time period */
          let timePeriod = "?";
          if (item.beginyear && item.endyear) {
            timePeriod = `${item.beginyear} - ${item.endyear}`;
          } else if (item.beginyear) {
            timePeriod = `${item.beginyear}`;
          } else if (item.endyear) {
            timePeriod = `${item.endyear}`;
          }

          return {
            title: item.artwork_title,
            style: item.style,
            artist: item.artist_name || "Unknown",
            timePeriod,
            image: item.url ? item.url.replace("!200,200", "!600,600") : null,
          };
        });

        setArtworks(formatted);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };
    fetchArtworks();
  }, [style, subclass]);

  return (
    <div className="topten-artwork-page">
      <ToptenNavbar />
      {/* <h3>Top 10 Artworks by Genre</h3> */} {/*  Will consider move to navbar or somewhere */}
      <Topten title="Top 10 Artworks" items={artworks} category="Artworks" />
    </div>
  );
};

export default ToptenArtworkPage;