const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// GET all movies (with search and category filtering)
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = { $regex: category, $options: "i" };
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// SEED movies database endpoint
router.post("/seed", async (req, res) => {
  try {
    const sampleMovies = [
      {
        title: "Stranger Things",
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        category: "Sci-Fi",
        posterUrl: "assets/img2.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        year: 2022,
        rating: "U/A 16+",
        isTrending: true
      },
      {
        title: "Wednesday",
        description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a mystery involving a supernatural spree while making new friends — and foes.",
        category: "Mystery",
        posterUrl: "assets/img3.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        year: 2022,
        rating: "U/A 13+",
        isTrending: true
      },
      {
        title: "Squid Game",
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
        category: "Thriller",
        posterUrl: "assets/img4.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        year: 2021,
        rating: "A",
        isTrending: true
      },
      {
        title: "Red Notice",
        description: "An FBI profiler pursuing the world's most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who's always one step ahead.",
        category: "Action",
        posterUrl: "assets/img5.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        year: 2021,
        rating: "U/A 13+",
        isTrending: true
      },
      {
        title: "Extraction",
        description: "A hardened mercenary's mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
        category: "Action",
        posterUrl: "assets/img6.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        year: 2020,
        rating: "A",
        isTrending: true
      },
      {
        title: "Avatar: The Last Airbender",
        description: "A young boy known as the Avatar must master the four elemental powers to save a world at war — and fight a ruthless enemy bent on stopping him.",
        category: "Sci-Fi",
        posterUrl: "assets/img7.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        year: 2024,
        rating: "U/A 13+",
        isTrending: true
      }
    ];

    // Clear existing movies to avoid duplicate seeding
    await Movie.deleteMany({});
    const seeded = await Movie.insertMany(sampleMovies);
    res.status(201).json({ message: "Seeded movies successfully!", count: seeded.length });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

module.exports = router;
