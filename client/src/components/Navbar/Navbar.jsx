import { useState } from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Menu");

  const menuItems = ["Art Style", "Art Genre", "Artists", "Donors", "Search"];

  return (
    <nav className="Navbar">
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {menuItems.map((item, index) => (
              <div key={index} className="dropdown-item">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
