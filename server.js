require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/netflixDB";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully to Atlas/Env URL"))
  .catch((err) => {
    console.error("MongoDB Atlas connection failed. Error:", err.message);
    console.log("Attempting local MongoDB connection fallback...");
    mongoose.connect("mongodb://127.0.0.1:27017/netflixDB")
      .then(() => console.log("MongoDB fallback connected successfully to localhost"))
      .catch((fallbackErr) => {
        console.error("Local MongoDB connection fallback failed. Error:", fallbackErr.message);
      });
  });

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
