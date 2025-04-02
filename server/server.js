// Former chaoyang's template as below comment part on Mar. 25:
// const http = require("http");
// const express = require("express");
// const app = express();

// Updated on Mar. 26 for client/public as backend for '/topten-artworks' page
// import express from "express";
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
app.get("/artwork", auth, routes.artwork);

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
