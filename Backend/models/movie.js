const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  isTrending: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Movie", MovieSchema);
