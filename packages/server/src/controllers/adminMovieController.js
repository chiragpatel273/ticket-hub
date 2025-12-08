const Movie = require("../models/Movie");

// CREATE MOVIE
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ message: "Error creating movie" });
  }
};

// UPDATE MOVIE
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ message: "Error updating movie" });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ success: true, message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};

// ADMIN MOVIE LIST
const getAdminMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json({ success: true, movies });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving movies" });
  }
};

module.exports = { createMovie, updateMovie, deleteMovie, getAdminMovies };
