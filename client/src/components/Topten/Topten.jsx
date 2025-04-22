/*
  This file is the repeated component for 2 Top Ten pages: Top Ten Artworks page and Top Ten Artists page
*/

import React from "react";
import "./Topten.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../assets/backgroundstar7.png";


const Topten = ({ title, items, category, showStyle = true }) => {
  const location = useLocation();
  const isGenrePage = location.pathname.includes("topten-artworks-by-genre");
  const isStylePage = !isGenrePage && location.pathname.includes("topten-artworks");
  
  return (
    <div className="topten-container">
      {/*<h2 className="topten-header">{title}</h2>*/}
      <div className="topten-scroll-wrapper">
        <div className="topten-list">
          {items.map((item, index) => (
            <div key={index} className="topten-item">
              <div className="topten-content">
                <div className="topten-left">
                  <div className="topten-rank"><h1>{index + 1}</h1></div>
                  <p><br /></p>
                  <div className="topten-text">
                    <p className="topten-category">{category}</p> 
                    <h3 className="topten-title">
                      {category === "Artworks" ? (
                        <Link to={`/artwork/${item.objectid}`} className="topten-link">
                          {item.title}
                        </Link>
                      ) : (                        
                        <Link to={`/search?mode=artist&query=${encodeURIComponent(item.artist)}`} className="topten-link">
                          {item.artist}
                        </Link>
                      )}
                  </h3>
                    {/* If this is for top ten artworks */}          
                    {category === "Artworks" && (
                      <article className="detail-list-description">
                        <p><br /></p>
                        <p>Time period: {item.timePeriod || "Unknown"}</p>
                        <p>Artist:{" "} {/* change to link page to search page */}
                            <Link to={`/search?mode=artist&query=${encodeURIComponent(item.artist)}`} className="topten-link">
                              {item.artist}
                            </Link>
                        </p>
                        { /* former version artist link not exists
                        <p>Artist:{" "}
                          <Link
                            to={`/artists/${item.artist.replace(/\s+/g, "-").toLowerCase()}`}
                            className="topten-link"
                          >
                            {item.artist}
                          </Link>
                        </p> */}
                          {!isGenrePage && <p>Art Style: {item.style || "Unknown"}</p>}
                          {!isStylePage && <p>Genre: {item.genre || "Unknown"}</p>}
                        </article>
                    )}
                    {/* If this is for top ten artists */}  
                    {category === "Artist" && (
                      <div className="artist-info-block">
                        <p><br /></p> 
                        <p>Artworks total: {item.artworkCount}</p>
                        <p>
                          Related work:{" "}
                          <Link to={`/artwork/${item.objectid}`} className="topten-link">
                            {item.title}
                          </Link>
                        </p>
                        <p>Influence: {item.lifeSpan}</p>
                        <p>
                          <a
                            href={`https://en.wikipedia.org/wiki/${item.artist.replace(/\s+/g, "_")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-link"
                          >
                            &#8690; More on Wikipedia 
                          </a>
                        </p>
                      </div>
                    )}                  
                  </div>
                  {/* downloadable secondary image */}
                  <a href={item.image} download>
                    <img src={item.image} alt={`${item.title} secondary`} className="topten-secondary-image hide-on-small" />
                  </a>
                  </div>
                  {/*<img src={item.image} alt={`${item.title} secondary`} className="topten-secondary-image  hide-on-small"/>*/}
                
                <div className="topten-right">
                  <img src={item.image} alt={item.title} className="topten-main-image"/>                    
                </div>  
              </div>
            </div>
          ))}
        </div>
      </div>  
    </div>
  );
};

export default Topten;
