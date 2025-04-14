/*
  /topten-artworks-by-genre page ( filter by genre, then by style ).
  We list the artwork's title, begin yer to start and the year finished, and other info.
  We also display the artwork image and we can simply download the image by clicking the smaller image under the descriptions.
*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import { config } from "../../config";
import "./ToptenArtworkByGenrePage.css";

const ToptenArtworkByGenrePage = () => {
  const [artworks, setArtworks] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const subclass = queryParams.get("subclass") || "paint";
  const style = queryParams.get("style") || "Impressionist";

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        /* Fetch data for Impression style ('drawing', 'sculpture', 'photograph',  'print', 'paint', 'decorative art')*/
        const response = await fetch(
          `${config.API_BASE_URL}/artwork-by-genre-style?subclass=${encodeURIComponent(subclass)}&style=${encodeURIComponent(style)}`,
          {
            headers: config.API_HEADERS,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const formatted = data.artworks.map((item) => {
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
            objectid: item.objectid,
            title: item.artwork_title,
            genre: item.genre,
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
  }, [subclass, style]);

  return (
    <div className="topten-artwork-genre">
      <ToptenNavbar id="genre-navbar" />
      <Topten title="Top 10 Artworks" items={artworks} category="Artworks" />
    </div>
  );
};

export default ToptenArtworkByGenrePage;
