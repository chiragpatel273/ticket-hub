const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createScreen,
  getMyScreens,
  getScreensByTheatre,
} = require("../controllers/screenController");

router.post("/", auth, createScreen);
router.get("/mine", auth, getMyScreens);
router.get("/theatre/:theatreId", auth, getScreensByTheatre);

module.exports = router;
