const Screen = require("../models/Screen");
const Theatre = require("../models/Theatre");

// Partner: Add screen
const createScreen = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.body.theatre);

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Prevent partner from adding screens to another partner's theatre
    if (String(theatre.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const screen = await Screen.create(req.body);
    res.json({ success: true, screen });
  } catch (err) {
    res.status(500).json({ message: "Error creating screen" });
  }
};

// Partner: View screens
const getMyScreens = async (req, res) => {
  console.log("req.user.id", req.user.id);
  try {
    const screens = await Screen.find()
      .populate({
        path: "theatre",
        select: "name city owner",
        match: { owner: req.user.id },
      })
      .then((docs) => docs.filter((screen) => screen.theatre));
    console.log("screens", screens);

    res.json({ success: true, screens });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving screens" });
  }
};

const getScreensByTheatre = async (req, res) => {
  try {
    const screens = await Screen.find({ theatre: req.params.theatreId });
    res.json({ success: true, screens });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving screens" });
  }
};

module.exports = { createScreen, getMyScreens, getScreensByTheatre };
