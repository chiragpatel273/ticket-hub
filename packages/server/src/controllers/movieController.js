const Movie = require("../models/Movie");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json({ success: true, movies });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving movies" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving movie" });
  }
};

module.exports = { getMovies, getMovieById };
