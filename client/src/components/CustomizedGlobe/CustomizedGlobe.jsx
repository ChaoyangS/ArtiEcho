import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./CustomizedGlobe.css";
import "../../styles/_global.css";
import Waterlilies from "../../assets/Water.webp";
import Sunflower from "../../assets/sunflower.jpeg";
import Starrynight from "../../assets/starrynight.jpeg";
import Mona from "../../assets/mona.jpeg";

function CustomizedGlobe() {
  const globeRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setPolygons(data.features);
      });
  }, []);

  // mock data for now, will replace with the key location data we want to display
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

  return (
    <div className="container">
      {/* Globe Component */}
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundColor="white"
        globeMaterial={() => {
          const material = new THREE.MeshStandardMaterial({
            color: "white",
            map: new THREE.TextureLoader().load(
              "https://unpkg.com/three-globe/example/img/earth-night.jpg"
            ),
          });
          return material;
        }}
        htmlElementsData={locations}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML = "✖"; // Unicode "X"
          el.className = "custom-marker";
          el.onclick = () => setSelectedLocation(d);
          return el;
        }}
        polygonsData={polygons}
        polygonCapColor={() => "rgba(0, 0, 0, 0.02)"} // Red with transparency
        polygonSideColor={() => "rgba(100, 110, 120, 0.2)"} // Soft grey sides
        polygonStrokeColor={() => "rgba(141,152,167,0.6)"} // White outline
        polygonAltitude={0.01} // Slight lift from the surface
        polygonLabel={(d) => `<b>${d.properties.name}</b>`}
      />

      {/* Navigation Pane */}
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
            <div className="artwork-list">
              {selectedLocation.artworks.map((art, index) => (
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
          </>
        ) : (
          <p>Click a location on the globe to see details.</p>
        )}
      </div>
    </div>
  );
}

export default CustomizedGlobe;
