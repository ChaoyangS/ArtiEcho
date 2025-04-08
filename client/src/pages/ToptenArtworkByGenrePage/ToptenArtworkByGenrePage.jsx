/*
  Top Ten Artworks page(by genre, then by style).
  Not yet finished, needs to be changed by the tokens from routes query.
*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import "./ToptenArtworkByGenrePage.css";

const ToptenArtworkByGenrePage = () => {
  const [artworks, setArtworks] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const style = queryParams.get("genre") || "paint";
  //const subclass = queryParams.get("subclass") || "Impressionist";
  useEffect(() => {

    const fetchArtworks = async () => {

      try { /* Fetch data for Impression style ('drawing', 'sculpture', 'photograph',  'print', 'paint', 'decorative art')*/
        const response = await fetch(`http://localhost:3000/artwork-by-genre?genre=${encodeURIComponent(genre)}`, {
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
            title: item.title,
            style: item.genre,
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

export default ToptenArtworkByGenrePage;