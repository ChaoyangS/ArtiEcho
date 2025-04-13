/*
  /topten-artworks page ( filter by style, then by genre ).
  We list the artwork's title, begin yer to start and the year finished, and other info.
  We also display the artwork image and we can simply download the image by clicking the smaller image under the descriptions.
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
  const style = queryParams.get("style") || "Neoclassic"; // previous default:Impressionist, or Surrealist
  const subclass = queryParams.get("subclass") || "paint";
  useEffect(() => {

    const fetchArtworks = async () => {

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
          /** Get valid time period as timePeriod var */
          let timePeriod = "?";
          if (item.beginyear && item.endyear) {
            timePeriod = `${item.beginyear} - ${item.endyear}`;
          } else if (item.beginyear) {
            timePeriod = `${item.beginyear}`;
          } else if (item.endyear) {
            timePeriod = `${item.endyear}`;
          }

          return {
            objectid: item.objectid,
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
      <Topten title="Top 10 Artworks" items={artworks} category="Artworks" />
    </div>
  );
};

export default ToptenArtworkPage;