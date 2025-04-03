const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const auth = require("./middleware/auth");
// import cors from "cors";
// import artworkRoutes from "./routes/artworks.js";

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: '*',  // 允许所有域名访问
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Token'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API Routes
//app.get("/artwork", auth, routes.artwork);

app.get("/artwork-by-genre", auth, routes.artworkByGenre);                
app.get("/artist", auth, routes.artist);                                  
app.get("/artwork-by-title", auth, routes.artworkByTitle);                
app.get("/artwork-by-style", auth, routes.artworkByStyle); 
app.get("/artwork-bibliography-search", auth, routes.artworkBibliographyByTitle);
app.get("/artwork-by-nationality", auth, routes.artworkByNationalityAndEndYear);
app.get("/top-nationalities", auth, routes.topNationalities);
app.get("/top-donors", auth, routes.topDonors);


/*
http://localhost:3000/artwork-by-genre?genre=Drawing
http://localhost:3000/artist
http://localhost:3000/artwork-by-title?title=Sunflowers
http://localhost:3000/artwork-by-style?style=Impression
http://localhost:3000/artwork-bibliography-search?title=sunflower
http://localhost:3000/artwork-by-nationality?nationality=French&endYear=1900
http://localhost:3000/top-nationalities
http://localhost:3000/top-donors
*/

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start server
const PORT = process.env.PORT || config.server_port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

require('dotenv').config();
