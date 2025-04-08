import { Link } from "react-router-dom";
import { useState } from "react";
import "./ToptenNavbar.css";

const ToptenNavbar = () => {
  const [activeStyle, setActiveStyle] = useState(null);

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
    "paint" : ["Impressionist", "Post-Impressionist", "Renaissance", "Abstract Expressionist", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Surrealist", "Gothic", "Minimalist"],
    "drawing": ["Impressionist", "Post-Impressionist", "Renaissance", "Victorian", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic"],
    "sculpture": ["Impressionist", "Post-Impressionist", "Renaissance", "Realist", "Baroque", "Romantic", "Neoclassic", "Rococo", "Gothic", "Minimalist"],
    "print": ["Pop", "Impressionist", "Post-Impressionist", "Realist", "Neoclassic", "Surrealist"],
    "decorative art": ["Kangxi", "Renaissance", "Baroque"]
  };
    // style = ("Impressionist", "Post-Impressionist", "Renaissance", "Abstract Expressionist", "Realist", 
    //          "Baroque", "Romantic", "Neoclassic", "Rococo", "Surrealist", "Gothic", "Rococo", "Minimalist")
    // subclass = ("paint", "drawing", "sculpture", "print", "decorative art", "photograph")
    return (
      <div className="hover-sidebar" onMouseLeave={() => setActiveStyle(null)}>
        
      <div className="sidebar-title">
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
            <h3>Art Styles</h3>
          </div>
          <ul>
            {Object.entries(stylesWithGenres).map(([style, genres]) => (
              <ul key={style}>
                <div
                  className="style-header"
                  onMouseEnter={() => setActiveStyle(style)}
                >
                  {style}
                </div>
                {activeStyle === style && (
                  <div className="genre-list">
                    {genres.map((genre) => (
                      <li key={genre}>
                        <Link
                          to={`/topten-artworks?style=${encodeURIComponent(style)}&subclass=${encodeURIComponent(genre)}`}
                        >
                          {genre}
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