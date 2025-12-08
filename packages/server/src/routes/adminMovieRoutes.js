const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getAdminMovies,
} = require("../controllers/adminMovieController");

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getAdminMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
