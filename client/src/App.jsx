import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomizedGlobe from "./components/CustomizedGlobe/CustomizedGlobe";
import ToptenArtworkPage from "./pages/ToptenArtworkPage/ToptenArtworkPage";
import Navbar from "./components/Navbar/Navbar";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
    {/*<h1>ArtiEcho</h1>*/}
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<CustomizedGlobe />} /> {/* Homepage route */}
        <Route path="/topten-artworks" element={<ToptenArtworkPage />} /> {/* Top 10 Artworks page route */}
      </Routes>
    </>
  );
}

export default App;