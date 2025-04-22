import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // added
import "./ToptenNavbar.css";

const ToptenNavbar = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // added
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
    "Impressionist": ["Paint", "Drawing", "Sculpture", "Print"],
    "Post-Impressionist": ["Paint", "Drawing", "Sculpture", "Print"],
    "Renaissance": ["Paint", "Drawing", "Sculpture", "Decorative art"],
    "Abstract Expressionist": ["Paint"],
    "Realist": ["Paint", "Drawing", "Sculpture", "Print"],
    "Baroque": ["Paint", "Drawing", "Sculpture", "Decorative art"],
    "Romantic": ["Paint", "Drawing", "Sculpture"],
    "Neoclassic": ["Paint", "Drawing", "Sculpture", "Print"],
    "Rococo": ["Paint", "Drawing", "Sculpture"],
    "Surrealist": ["Paint", "Print"],
    "Gothic": ["Paint", "Sculpture"],
    "Minimalist": ["Paint", "Sculpture"]
  };
  
  const genreWithStyles = {
    "Paint": ["Post-Impressionist", "Renaissance", "Abstract Expressionist", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Surrealist", "Gothic", "Minimalist"],
    "Drawing": ["Impressionist", "Post-Impressionist", "Renaissance", "Victorian", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic"],
    "Sculpture": ["Impressionist", "Post-Impressionist", "Renaissance", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic", "Minimalist"],
    "Print": ["Pop", "Impressionist", "Post-Impressionist", "Realist", "Neoclassic", "Surrealist"],
    "Decorative art": ["Kangxi", "Renaissance", "Baroque"]
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
        {!sidebarOpen && (
          <div className="sidebar-still">
            <p> &nbsp; &nbsp; &nbsp; Find&nbsp;  your&nbsp;  artistic&nbsp;  match&nbsp; &nbsp; &nbsp; &nbsp; &#8675;&#8675;&#8675;</p>
          </div>
        )}
        
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