import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/_global.css";
import CustomizedGlobe from "./components/CustomizedGlobe/CustomizedGlobe";
import ToptenArtworkPage from "./pages/ToptenArtworkPage/ToptenArtworkPage";
import DonarsPage from "./pages/DonarsPage/DonarsPage";
import ToptenArtworkByGenrePage from "./pages/ToptenArtworkByGenrePage/ToptenArtworkByGenrePage";
import Navbar from "./components/Navbar/Navbar";
import ChatButton from "./components/ChatButton/ChatButton";

function App() {

  const [count, setCount] = useState(0);
  // Only show Navbar on homepage
  const showNavbar = location.pathname === "/"; 

  return (
    <>
    {showNavbar && <Navbar />}
    {/*<h1>ArtiEcho</h1>*/}
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<CustomizedGlobe />} /> {/* Homepage route */}
        <Route path="/topten-artworks" element={<ToptenArtworkPage />} /> {/* Top 10 Artworks by style-genre page route */}
        <Route path="/topten-artworks-by-genre" element={<ToptenArtworkByGenrePage/>}/> {/* Top 10 Artworks by genre-style page route */}
        <Route path="/topten-artists" element={<ToptenArtworkPage />} /> {/* Top 10 Artists by number of artworks */}
        <Route path="/donars" element={<DonarsPage />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
      <ChatButton />
    </>
  );
}

export default App;
