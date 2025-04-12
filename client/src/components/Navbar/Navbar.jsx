import { useState, useEffect } from "react";
import "./Navbar.css";
import artiechologo from "../../assets/logo4.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={artiechologo} alt="ArtiEcho" className="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        {isMobile ? (
          <div className="navbar-menu">
            <button
              className={`menu-button ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
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
        ) : (
          <div className="navbar-links">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.route} className="navbar-link">
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