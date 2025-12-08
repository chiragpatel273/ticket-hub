const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const { createTheatre, getMyTheatres } = require("../controllers/theatreController");

// Partner only: Create theatre
router.post("/", auth, createTheatre);

// Partner only: View own theatres
router.get("/mine", auth, getMyTheatres);

module.exports = router;
