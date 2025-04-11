import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // added
import "./ToptenNavbar.css";

const ToptenNavbar = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // added
  const [activeStyle, setActiveStyle] = useState(null);
  const sidebarRef = useRef(null); // add
  const location = useLocation();
  const isByGenrePage = location.pathname.includes("/topten-artworks-by-genre");

  // if click on region outside sidebar
  useEffect( () => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
        setActiveStyle(null);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };

  }, [sidebarOpen]);

  const stylesWithGenres = {
    "Impressionist": ["paint", "drawing", "sculpture", "print"],
    "Post-Impressionist": ["paint", "drawing", "sculpture", "print"],
    "Renaissance": ["paint", "drawing", "sculpture", "decorative art"],
    "Abstract Expressionist": ["paint"],
    "Realist": ["paint", "drawing", "sculpture", "print"],
    "Baroque": ["paint", "drawing", "sculpture", "decorative art"],
    "Romantic": ["paint", "drawing", "sculpture"],
    "Neoclassic": ["paint", "drawing", "sculpture", "print"],
    "Rococo": ["paint", "drawing", "sculpture"],
    "Surrealist": ["paint", "print"],
    "Gothic": ["paint", "sculpture"],
    "Minimalist": ["paint",  "sculpture"]
  };

  const genreWithStyles = {
    "paint" : ["Post-Impressionist", "Renaissance", "Abstract Expressionist", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Surrealist", "Gothic", "Minimalist"],
    "drawing": ["Impressionist", "Post-Impressionist", "Renaissance", "Victorian", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic"],
    "sculpture": ["Impressionist", "Post-Impressionist", "Renaissance", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic", "Minimalist"],
    "print": ["Pop", "Impressionist", "Post-Impressionist", "Realist", "Neoclassic", "Surrealist"],
    "decorative art": ["Kangxi", "Renaissance", "Baroque"]
  };

    return (
      <div
        id={props.id} 
        className={`click-sidebar-container ${sidebarOpen ? "open" : ""}`}
        onClick={() => !sidebarOpen && setSidebarOpen(true)}
        ref={sidebarRef}
      >
        
      <div className="sidebar-title" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scalable-icon"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </div>

        <div className="hover-sidebar-inner">
          <div className="heading-font">
            <h3>{isByGenrePage ? "Genres" : "Art Styles"}</h3>
          </div>
          <ul>
          {Object.entries(isByGenrePage ? genreWithStyles : stylesWithGenres).map(([header, values]) => (
              <ul key={header}>
                <div
                  className="style-header"
                  onClick={() => setActiveStyle(header === activeStyle ? null : header)}
                >
                  {header}
                </div>
                {activeStyle === header && (
                  <div className="genre-list">
                    {values.map((value) => (
                      <li key={value}>
                        <Link
                          to={
                            isByGenrePage
                              ? `/topten-artworks-by-genre?subclass=${encodeURIComponent(header)}&style=${encodeURIComponent(value)}`
                              : `/topten-artworks?style=${encodeURIComponent(header)}&subclass=${encodeURIComponent(value)}`
                          }
                        >
                          {value}
                        </Link>
                      </li>
                    ))}
                  </div>
                )}
              </ul>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default ToptenNavbar;