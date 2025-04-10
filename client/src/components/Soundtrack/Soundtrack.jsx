import React, { useState } from "react";
import "./Soundtrack.css"; // optional if you want to style further

const Soundtrack = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="soundtrack">
      <button onClick={() => setIsOpen(!isOpen)} className="soundtrack-toggle">
        {isOpen ? "Hide" : "Sound Experience"}
      </button>

      {isOpen && (
        <>
          <iframe
            width="150%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/53337986&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div
            style={{
              fontSize: "0.5rem",
              color: "#cccccc",
              lineBreak: "anywhere",
              wordBreak: "normal",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontFamily:
                "Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif",
              fontWeight: 100,
            }}
          >
            <a
              href="https://soundcloud.com/hasnaa-tabra"
              title="Hasnaa Tabra"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Hasnaa Tabra
            </a>{" "}
            ·{" "}
            <a
              href="https://soundcloud.com/hasnaa-tabra/sets/classical-music"
              title="Classical Music"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Classical Music
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Soundtrack;
