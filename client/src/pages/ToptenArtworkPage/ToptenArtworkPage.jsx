import React from "react";
import ToptenNavbar from "../../components/Topten/ToptenNavbar";
import Topten from "../../components/Topten/Topten";
import "./ToptenArtworkPage.css";
import Mona from "../../assets/mona.jpeg";
import Starrynight from "../../assets/starrynight.jpeg";
import Sunflowers from "../../assets/sunflower.jpeg";
import Water from "../../assets/water.webp";
import Swordman from "../../assets/swordman.jpeg"; // example with fake name from data
import Unknown from "../../assets/unknown.jpeg"; // example with fake name from data

const mockArtworks = [
  // Mock artwork datas, can be replaced by the query
  { title: "Starry Night", artist: "Vincent van Gogh", image: Starrynight },
  { title: "Mona Lisa", artist: "Leonardo da Vinci", image: Mona },
  { title: "Sunflowers", artist: "Vincent van Gogh", image: Sunflowers },
  { title: "Water Lily", artist: "Claude Monet", image: Water },
  { title: "Swordman", artist: "unknown", image: Swordman },
  { title: "Hills", artist: "unknown", image: Unknown },
];

const ToptenArtworkPage = () => {
  return (
    <div className="topten-artwork-page">
      {/* <ToptenNavbar />*/}
      <h3>Top 10 Artworks by Genre</h3>
      <Topten title="Top 10 Artworks" items={mockArtworks} category="Artworks" /> 
    </div>
  );
};

export default ToptenArtworkPage;
