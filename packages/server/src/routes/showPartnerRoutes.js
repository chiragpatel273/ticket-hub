const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { createShow, getMyShows, updateShow, deleteShow } = require("../controllers/showController");

router.post("/", auth, createShow);
router.get("/mine", auth, getMyShows);
router.put("/:id", auth, updateShow);
router.delete("/:id", auth, deleteShow);

module.exports = router;
