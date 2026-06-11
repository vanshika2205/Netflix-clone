require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./models/movie");

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/netflixDB";

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

async function seed() {
  try {
    console.log("Connecting to MongoDB at:", mongoURI);
    await mongoose.connect(mongoURI);
    console.log("Connected successfully. Seeding...");
    await runSeeding();
  } catch (error) {
    console.error("MongoDB Atlas connection failed. Error:", error.message);
    console.log("Attempting local MongoDB connection fallback...");
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/netflixDB");
      console.log("Connected successfully to localhost MongoDB fallback.");
      await runSeeding();
    } catch (fallbackError) {
      console.error("Local MongoDB fallback failed:", fallbackError.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

async function runSeeding() {
  console.log("Clearing existing movies...");
  await Movie.deleteMany({});
  console.log("Existing movies cleared. Seeding database...");
  const result = await Movie.insertMany(sampleMovies);
  console.log(`Successfully seeded ${result.length} movies.`);
}

seed();
