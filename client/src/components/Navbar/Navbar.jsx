import { useState, useEffect } from "react";
import "./Navbar.css"; // Import the CSS file
import artiechologo from "../../assets/artiechologo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Art Style", route: "/topten-artworks" },
    { label: "Art Genre", route: "/topten-artworks-by-genre" },
    { label: "Artist", route: "/topten-artists" },
    { label: "Nationality", route: "/nationality" },
    { label: "Donors", route: "/donors" },
    { label: "Search", route: "/search" },
  ];

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
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand">
          <img src={artiechologo} alt="ArtiEcho" className="logo" />
          ArtiEcho
        </Link>
      </div>
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
              <Link
                key={index}
                to={item.route}
                className="menu-item"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
