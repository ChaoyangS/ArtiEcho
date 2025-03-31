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
// import cors from "cors";
// import artworkRoutes from "./routes/artworks.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const PORT = 3000;

app.use(cors());
app.use(express.json());
// app.use("/topten-artworks", artworkRoutes);
app.get("/artwork", routes.artwork);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
