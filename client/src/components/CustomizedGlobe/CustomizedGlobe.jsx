import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./CustomizedGlobe.css";
import "../../styles/_global.css";

import Waterlilies from "../../assets/Water.webp";
import Sunflower from "../../assets/sunflower.jpeg";
import Starrynight from "../../assets/starrynight.jpeg";
import Mona from "../../assets/mona.jpeg";

// 🎨 Function to Create Globe Material
const createGlobeMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.5,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    roughness: 0.5,
    metalness: 0.3,
    map: new THREE.TextureLoader().load(
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/BlackMarble20161km.jpg"
    ),
  });
};

// 📍 Mock Data for Locations
const locations = [
  {
    lat: 51.5074,
    lng: -0.1278,
    name: "London",
    artworks: [
      {
        title: "Water Lilies",
        artist: "Claude Monet",
        museum: "National Gallery",
        year: 1916,
        image: Waterlilies,
      },
      {
        title: "Sunflowers",
        artist: "Vincent van Gogh",
        museum: "National Gallery",
        year: 1888,
        image: Sunflower,
      },
    ],
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    name: "Paris",
    artworks: [
      {
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        museum: "Louvre Museum",
        year: 1503,
        image: Mona,
      },
      {
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        museum: "Musée d'Orsay",
        year: 1889,
        image: Starrynight,
      },
    ],
  },
];

// 📌 Function to Render HTML Element for Locations
const renderHtmlElement = (location, setSelectedLocation) => {
  const el = document.createElement("div");
  el.innerHTML = "✖";
  el.className = "custom-marker";
  el.onclick = () => setSelectedLocation(location);
  return el;
};

// 🎭 Artwork List Component
const ArtworkList = ({ artworks }) => (
  <div className="artwork-list">
    {artworks.map((art, index) => (
      <div key={index} className="artwork-card">
        <img src={art.image} alt={art.title} width="450" />
        <div className="artwork-details">
          <h3>{art.title}</h3>
          <p>
            <strong>Artist:</strong> {art.artist}
          </p>
          <p>
            <strong>Museum:</strong> {art.museum}
          </p>
          <p>
            <strong>Year:</strong> {art.year}
          </p>
        </div>
      </div>
    ))}
  </div>
);

function CustomizedGlobe() {
  const globeRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [polygons, setPolygons] = useState([]);

  // 🌍 Fetch GeoJSON Data
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => res.json())
      .then((data) => setPolygons(data.features));
  }, []);

  return (
    <div className="container">
      {/* 🌎 Globe Component */}
      <Globe
        ref={globeRef}
        globeImageUrl="https://upload.wikimedia.org/wikipedia/commons/2/2c/BlackMarble20161km.jpg"
        backgroundColor="#000000"
        globeMaterial={createGlobeMaterial}
        htmlElementsData={locations}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => renderHtmlElement(d, setSelectedLocation)}
        polygonsData={polygons}
        polygonCapColor={() => "lightgrey"}
        polygonSideColor={() => "grey"}
        polygonStrokeColor={() => "#333333"}
        polygonAltitude={0.01}
        polygonLabel={null}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.1}
      />

      {/* 📌 Navigation Pane */}
      <div className={`nav-pane ${selectedLocation ? "open" : ""}`}>
        {selectedLocation ? (
          <>
            <button
              className="close-btn"
              onClick={() => setSelectedLocation(null)}
            >
              ×
            </button>
            <h2>{selectedLocation.name}</h2>
            <ArtworkList artworks={selectedLocation.artworks} />
          </>
        ) : (
          <p>Click a location on the globe to see details.</p>
        )}
      </div>
    </div>
  );
}

export default CustomizedGlobe;
