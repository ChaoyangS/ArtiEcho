import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./CustomizedGlobe.css";
import "../../styles/_global.css";

// Function to Create Globe Material
// const createGlobeMaterial = () => {
//   return new THREE.MeshBasicMaterial({
//     color: new THREE.Color(),
//     map: new THREE.TextureLoader().load(
//       "https://upload.wikimedia.org/wikipedia/commons/2/2c/BlackMarble20161km.jpg"
//     ),
//   });
// };
const createGlobeMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(
    "/texture.png"
    // "https://upload.wikimedia.org/wikipedia/commons/7/7f/Watercolor_paper_texture_background.jpg"
  ),
});

// Mapping nationality to location
const nationalityToLocation = {
  American: {
    lat: 40.7128,
    lng: -74.006,
    name: "United States",
  },
  French: {
    lat: 48.864716,
    lng: 2.349014,
    name: "France",
  },
  British: {
    lat: 51.509865,
    lng: -0.118092,
    name: "United Kingdom",
  },
  Italian: {
    lat: 41.902782,
    lng: 12.496366,
    name: "Italy",
  },
  German: {
    lat: 52.5244,
    lng: 13.4105,
    name: "Germany",
  },
  Dutch: {
    lat: 52.377956,
    lng: 4.89707,
    name: "Netherlands",
  },
  Flemish: {
    lat: 50.8505,
    lng: 4.3488,
    name: "Belgium",
  },
  Austrian: {
    lat: 48.2085,
    lng: 16.3721,
    name: "Austria",
  },
  Swiss: {
    lat: 46.9481,
    lng: 7.4474,
    name: "Switzerland",
  },
  Czech: {
    lat: 50.073658,
    lng: 14.41854,
    name: "Czech Republic",
  },
  Spanish: {
    lat: 40.416775,
    lng: -3.70379,
    name: "Spain",
  },
  English: {
    lat: 51.509865,
    lng: -0.118092,
    name: "England",
  },
  Russian: {
    lat: 55.752121,
    lng: 37.617664,
    name: "Russia",
  },
  Netherlandish: {
    lat: 52.377956,
    lng: 4.89707,
    name: "Netherlands",
  },
  Scottish: {
    lat: 55.948612,
    lng: -3.200833,
    name: "Scotland",
  },
  Japanese: {
    lat: 35.682839,
    lng: 139.759455,
    name: "Japan",
  },
  Belgian: {
    lat: 50.8505,
    lng: 4.3488,
    name: "Belgium",
  },
  Polish: {
    lat: 52.237049,
    lng: 21.017532,
    name: "Poland",
  },
  Swedish: {
    lat: 59.3293,
    lng: 18.0686,
    name: "Sweden",
  },
  Canadian: {
    lat: 45.4215,
    lng: -75.6972,
    name: "Canada",
  },
  Irish: {
    lat: 53.3331,
    lng: -6.2489,
    name: "Ireland",
  },
  Mexican: {
    lat: 19.432608,
    lng: -99.133209,
    name: "Mexico",
  },
  Hungarian: {
    lat: 47.4979,
    lng: 19.0402,
    name: "Hungary",
  },
  Danish: {
    lat: 55.6761,
    lng: 12.5683,
    name: "Denmark",
  },
  Australian: {
    lat: -35.2809,
    lng: 149.13,
    name: "Australia",
  },
  Argentinean: {
    lat: -34.6037,
    lng: -58.3816,
    name: "Argentina",
  },
  Chinese: {
    lat: 39.9042,
    lng: 116.4074,
    name: "China",
  },
  Greek: {
    lat: 37.9838,
    lng: 23.7275,
    name: "Greece",
  },
  Brazilian: {
    lat: -15.8267,
    lng: -47.9218,
    name: "Brazil",
  },
  Norwegian: {
    lat: 59.9139,
    lng: 10.7522,
    name: "Norway",
  },
  Cuban: {
    lat: 23.1136,
    lng: -82.3666,
    name: "Cuba",
  },
  Israeli: {
    lat: 31.7683,
    lng: 35.2137,
    name: "Israel",
  },
  Yugoslavian: {
    lat: 44.7866,
    lng: 20.4489,
    name: "Serbia",
  },
  Bohemian: {
    lat: 50.0755,
    lng: 14.4378,
    name: "Czech Republic",
  },
  Romanian: {
    lat: 44.4268,
    lng: 26.1025,
    name: "Romania",
  },
  Welsh: {
    lat: 51.4816,
    lng: -3.1791,
    name: "Wales",
  },
  Portuguese: {
    lat: 38.7169,
    lng: -9.1399,
    name: "Portugal",
  },
};

// Function to Render HTML Element for Locations
const renderHtmlElement = (location, setSelectedLocation) => {
  const el = document.createElement("div");
  el.innerHTML = "✘";
  el.className = "custom-marker";
  el.onclick = () => setSelectedLocation(location);
  return el;
};

// Artwork List Component
const ArtworkList = ({ artworks }) => (
  <div className="artwork-list">
    {artworks.map((art, index) => (
      <div key={index} className="artwork-card">
        <img src={art.image} alt={art.title} className="artwork-image" />
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
  /**
   * add background dynamic size handler (fix on - 04/10)
   */
  const [globeSize, setGlobeSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  /* */

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
            `http://localhost:3000/artwork-by-nationality?nationality=${nationality}`,
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
            image: item.url ? item.url.replace("!200,200", "!800,800") : null,
          });
        });
      });

      setLocations(Object.values(grouped));
    };

    fetchArtworksForAllNationalities();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }
  }, []);
  /**
   * add background dynamic size handler here(fix on - 04/10)
   */
  useEffect(() => {
    const handleResize = () => {
      setGlobeSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container">
      <div
        className="Globe"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Globe
          ref={globeRef}
          width={globeSize.width}
          height={globeSize.height} // fixed background dynamic size
          backgroundColor="#9aa8c3"
          globeMaterial={createGlobeMaterial}
          htmlElementsData={locations}
          htmlLat={(d) => d.lat}
          htmlLng={(d) => d.lng}
          htmlElement={(d) => renderHtmlElement(d, setSelectedLocation)}
          polygonsData={polygons}
          polygonCapColor={() => "rgba(207, 202, 229, 0.1)"}
          polygonSideColor={() => "rgba(97, 131, 180, 0.3)"}
          polygonStrokeColor={() => "#243167"}
          polygonAltitude={0.01}
          polygonLabel={null}
          atmosphereColor="#ffffff"
          atmosphereAltitude={0.1}
        />
      </div>

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
          <p>Click a location on the globe to start your journey</p>
        )}
      </div>
    </div>
  );
}

export default CustomizedGlobe;
