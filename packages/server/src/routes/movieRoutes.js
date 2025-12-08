const express = require("express");
const Movie = require("../models/Movie");
const { getMovies, getMovieById } = require("../controllers/movieController");

const router = express.Router();

// Public route: Get all movies
router.get("/", getMovies);

// Public route: Get movie by ID
router.get("/:id", getMovieById);

module.exports = router;
