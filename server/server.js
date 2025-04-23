const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const auth = require("./middleware/auth");


// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "*", // Allows all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-API-Token"],
  exposedHeaders: ["Access-Control-Allow-Origin"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-API-Token, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// API Routes
// X-API-Token : artiecho
// 1  http://localhost:3000/artwork-by-id?id=131766
app.get("/artwork-by-id", auth, routes.artworkbyID);

// 2  http://localhost:3000/artwork-by-year?year=1950
app.get("/artwork-by-year", auth, routes.artworkByYear);

// 3  http://localhost:3000/artwork-by-title?title=Sunflowers
app.get("/artwork-by-title", auth, routes.artworkByTitle);

// 4  http://localhost:3000/artwork-by-nationality?nationality=French
app.get("/artwork-by-nationality", auth, routes.artworkByNationality);

// 5  http://localhost:3000/artwork-by-artist?artist=Monet
app.get("/artwork-by-artist", auth, routes.artworkByArtist);

// 6  http://localhost:3000/artwork-by-style?style=Impression&subclass=Painting
app.get("/artwork-by-style", auth, routes.artworkByStyle);

// 7  http://localhost:3000/artwork-by-genre-style?subclass=Painting&style=Impression
app.get("/artwork-by-genre-style", auth, routes.artworkByGenreByStyle);

// 8  http://localhost:3000/top-nationalities
app.get("/top-nationalities", auth, routes.topNationalities);

// 9  http://localhost:3000/topten-artist
app.get("/topten-artist", auth, routes.topTenArtist);

// 10 http://localhost:3000/top-donors
app.get("/top-donors", auth, routes.topDonors);

// 11 http://localhost:3000/artwork-bibliography?id=131766
app.get("/artwork-bibliography", auth, routes.artworkBibliography);

// 12 http://localhost:3000/artwork-exhibition-history?id=1111
app.get("/artwork-exhibition-history", auth,routes.artworkExhibitionHistory);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const PORT = process.env.PORT || config.server_port || 3000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;

require("dotenv").config();
