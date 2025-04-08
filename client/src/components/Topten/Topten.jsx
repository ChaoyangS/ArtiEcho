/*
  This file is the repeated component for 2 Top Ten pages: Top Ten Artworks page and Top Ten Artists page
*/

import React from "react";
import "./Topten.css";
import { Link } from "react-router-dom";

const Topten = ({ title, items, category }) => {
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
                  <div className="topten-text">
                    <p className="topten-category">{category}</p> 
                    <h3 className="topten-title">
                    <Link to={`/artworks/${item.title.replace(/\s+/g, "-").toLowerCase()}`} className="topten-link">{item.title}</Link>  
                    </h3> 
                    {/* If this is for top ten artworks */}          
                    {category === "Artworks" && (
                      <article className="detail-list-description">
                        <p>Time period: {item.timePeriod || "Unknown"}</p>
                        <p>Artist:{" "}
                          <Link
                            to={`/artists/${item.artist.replace(/\s+/g, "-").toLowerCase()}`}
                            className="topten-link"
                          >
                            {item.artist}
                          </Link></p>
                        <p>Art Style:{item.style || "Unknown"}</p>
                        </article>
                    )}
                    {/* If this is for top ten artists */}  
                    {category === "Artists" && (
                      <>
                        <p>Notable Works: {item.notableWorks}</p>
                        <p>Influence: {item.influence}</p>
                      </>
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
