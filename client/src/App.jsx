import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/_global.css";
import CustomizedGlobe from "./components/CustomizedGlobe/CustomizedGlobe";
import ToptenArtworkPage from "./pages/ToptenArtworkPage/ToptenArtworkPage";
import DonarsPage from "./pages/DonarsPage/DonarsPage";
import ToptenArtworkByGenrePage from "./pages/ToptenArtworkByGenrePage/ToptenArtworkByGenrePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<CustomizedGlobe />} /> {/* Homepage route */}
        <Route path="/topten-artworks" element={<ToptenArtworkPage />} />{" "}
        <Route path="/donars" element={<DonarsPage />} />
        {/* Top 10 Artworks page route */}
      </Routes>
    </>
  );
}

export default App;
