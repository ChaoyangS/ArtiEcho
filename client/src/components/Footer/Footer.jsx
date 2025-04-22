import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Artiecho. All rights reserved.</p>
      <div className="footer-links">
        <a href="/">About</a>
        <a href="mailto:hello@artiecho.com">Contact</a>
        <a
          href="https://github.com/ChaoyangS/ArtiEcho"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
