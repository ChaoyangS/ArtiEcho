import { useState, useEffect } from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Art Style", "Art Genre", "Artists", "Donors", "Search"];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const dropdown = document.querySelector(".menu-dropdown");
        if (dropdown) {
          dropdown.classList.add("active");
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">ArtiEcho</div>
      <div className="navbar-menu">
        <button
          className={`menu-button ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          Menu
        </button>
        {isOpen && (
          <div className="menu-dropdown">
            {menuItems.map((item, index) => (
              <a key={index} href="#" className="menu-item">
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
