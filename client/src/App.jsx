import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomizedGlobe from "./components/CustomizedGlobe/CustomizedGlobe";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      {/* <h1>ArtiEcho</h1> */}

      <CustomizedGlobe />
    </>
  );
}

export default App;
