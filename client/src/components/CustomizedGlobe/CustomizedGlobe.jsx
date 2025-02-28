import Globe from "react-globe.gl";

export default function CustomizedGlobe() {
  return (
    <>
      {/* <Globe
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        // globeImageUrl="https://unpkg.com/three-globe/example/img/earth-white.jpg"
        // globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="#101820" // Deep Charcoal (sleek and futuristic)
        labelsData={[
          { lat: 40.7128, lng: -74.006, name: "New York" },
          { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
          { lat: 51.5074, lng: -0.1278, name: "London" },
        ]}
        labelText="name"
        labelSize={1.5}
        labelDotRadius={0.4} // Small dot under label
        labelColor={() => "white"}
      /> */}

      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg" // Use any working image
        backgroundColor="white"
        // globeMaterial={() => {
        //   const material = new THREE.MeshBasicMaterial({ color: "white" }); // White color
        //   return material;
        // }}
        globeMaterial={() => {
          const material = new THREE.MeshStandardMaterial({
            color: "white",
            map: new THREE.TextureLoader().load(
              "https://unpkg.com/three-globe/example/img/earth-night.jpg"
            ),
          });
          return material;
        }}
        labelsData={[
          { lat: 40.7128, lng: -74.006, name: "New York" },
          { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
          { lat: 51.5074, lng: -0.1278, name: "London" },
        ]}
        labelText="name"
        labelSize={1.5}
        labelDotRadius={0.4} // Small dot under label
        labelColor={() => "grey"}
      />
    </>
  );
}
