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

app.get("/artwork-by-genre", routes.artworkByGenre);                
app.get("/artist", routes.artist);                                  
app.get("/artwork-by-title", routes.artworkByTitle);                
app.get("/artwork-by-style", routes.artworkByStyle); 
app.get("/artwork-bibliography-search", routes.artworkBibliographyByTitle);
app.get("/artwork-by-nationality", routes.artworkByNationalityAndEndYear);
app.get("/top-nationalities", routes.topNationalities);
app.get("/top-donors", routes.topDonors);


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



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
