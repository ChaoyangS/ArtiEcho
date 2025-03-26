import express from 'express';
const router = express.Router();

// Use public-facing URLs or paths from React's public folder
router.get('/', async (req, res) => {
  try {  // we will change this part to query to get artworks when we switch to AWS database.js in server/database folder
    const mockArtworks = [
      { title: "Starry Night", artist: "Vincent van Gogh", image: "/starrynight.jpeg" },
      { title: "Mona Lisa", artist: "Leonardo da Vinci", image: "/mona.jpeg" },
      { title: "Sunflowers", artist: "Vincent van Gogh", image: "/sunflower.jpeg" },
      { title: "Water Lily", artist: "Claude Monet", image: "/water.webp" },
      { title: "Swordman", artist: "unknown", image: "/swordman.jpeg" },
      { title: "Hills", artist: "unknown", image: "/unknown.jpeg" },
    ];

    res.json(mockArtworks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;