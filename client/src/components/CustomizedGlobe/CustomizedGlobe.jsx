import React, { useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./CustomizedGlobe.css";

function CustomizedGlobe() {
  const globeRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      lat: 40.7128,
      lng: -74.006,
      name: "New York",
      description: "The city that never sleeps.",
    },
    {
      lat: 34.0522,
      lng: -118.2437,
      name: "Los Angeles",
      description: "The entertainment capital of the world.",
    },
    {
      lat: 51.5074,
      lng: -0.1278,
      name: "London",
      description: "A historic and financial hub.",
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
            <p>{selectedLocation.description}</p>
          </>
        ) : (
          <p>Click a location on the globe to see details.</p>
        )}
      </div>
    </div>
  );
}

export default CustomizedGlobe;
