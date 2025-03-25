import React from "react";
import "./Topten.css";

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
                    <h3 className="topten-title">{item.title}</h3>           
                    {category === "Artworks" && (
                      <article className="detail-list-description">
                        <p>Time period:</p>
                        <p>Artist: {item.artist}</p>
                        <p>Art Style:</p>
                        </article>
                    )}
                    {category === "Artists" && (
                      <>
                        <p>Notable Works: {item.notableWorks}</p>
                        <p>Influence: {item.influence}</p>
                      </>
                    )}                  
                  </div>
                  <img src={item.image} alt={`${item.title} secondary`} className="topten-secondary-image  hide-on-small"/>
                </div>
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
