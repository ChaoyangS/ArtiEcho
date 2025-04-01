const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");

const app = express();  // need to install express module

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = 3000;

app.get("/artwork", routes.artwork);
app.get("/artist", routes.artist); // ADD THIS

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
