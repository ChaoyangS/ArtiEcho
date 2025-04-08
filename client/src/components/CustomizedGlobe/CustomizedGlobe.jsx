import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./CustomizedGlobe.css";
import "../../styles/_global.css";

// Function to Create Globe Material
const createGlobeMaterial = () => {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xffffff),
    map: new THREE.TextureLoader().load(
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/BlackMarble20161km.jpg"
    ),
  });
};

// Mapping nationality to location
const nationalityToLocation = {
  American: {
    lat: 40.7128,
    lng: -74.006,
    name: "United States",
  },
  British: {
    lat: 51.5072,
    lng: -0.1276,
    name: "United Kingdom",
  },
  Dutch: {
    lat: 52.3676,
    lng: 4.9041,
    name: "Netherlands",
  },
  French: {
    lat: 48.8566,
    lng: 2.3522,
    name: "France",
  },
  German: {
    lat: 52.52,
    lng: 13.405,
    name: "Germany",
  },
  Italian: {
    lat: 41.9028,
    lng: 12.4964,
    name: "Italy",
  },
};

// Function to Render HTML Element for Locations
const renderHtmlElement = (location, setSelectedLocation) => {
  const el = document.createElement("div");
  el.innerHTML = "✖";
  el.className = "custom-marker";
  el.onclick = () => setSelectedLocation(location);
  return el;
};

// Artwork List Component
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
  const [locations, setLocations] = useState([]); // dynamic locations

  // Fetch globe polygons
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => res.json())
      .then((data) => setPolygons(data.features));
  }, []);

  useEffect(() => {
    const fetchArtworksForAllNationalities = async () => {
      const nationalities = Object.keys(nationalityToLocation);
      const token = "artiecho";

      const requests = nationalities.map((nationality) =>
        axios
          .get(
            `http://localhost:3000/artwork-by-nationality?nationality=${nationality}&endYear=1900`,
            {
              headers: {
                "X-API-Token": token,
              },
            }
          )
          .then((res) => ({ nationality, data: res.data }))
          .catch((err) => {
            console.error(`Failed to fetch for ${nationality}`, err);
            return null;
          })
      );

      const responses = await Promise.all(requests);
      const grouped = {};

      responses.forEach((response) => {
        if (!response) return;

        const { nationality, data } = response;
        const locInfo = nationalityToLocation[nationality];
        if (!locInfo) return;

        const key = locInfo.name;

        if (!grouped[key]) {
          grouped[key] = {
            ...locInfo,
            artworks: [],
          };
        }

        data.forEach((item) => {
          grouped[key].artworks.push({
            title: item.artwork_title,
            artist: item.preferreddisplayname,
            museum: "Unknown",
            year: item.beginyear,
            image: item.url ? item.url.replace("!200,200", "!600,600") : null,
          });
        });
      });

      setLocations(Object.values(grouped));
    };

    fetchArtworksForAllNationalities();
  }, []);

  return (
    <div className="container">
      <Globe
        ref={globeRef}
        backgroundColor="#000000"
        globeMaterial={createGlobeMaterial}
        htmlElementsData={locations}
        htmlLat={(d) => d.lat}
        htmlLng={(d) => d.lng}
        htmlElement={(d) => renderHtmlElement(d, setSelectedLocation)}
        polygonsData={polygons}
        polygonCapColor={() => "lightgrey"}
        polygonSideColor={() => "white"}
        polygonStrokeColor={() => "black"}
        polygonAltitude={0.01}
        polygonLabel={null}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.1}
        width={1000}
        height={1000}
      />

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
