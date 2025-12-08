const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true, // duration in minutes
    },

    releaseDate: {
      type: Date,
    },

    poster: {
      type: String, // URL
      required: false,
      default: "https://via.placeholder.com/300x450?text=No+Poster",
    },

    // For future: rating, popularity, age rating, etc.
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Movie", movieSchema);
