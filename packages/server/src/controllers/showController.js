const Show = require("../models/Show");
const Screen = require("../models/Screen");
const Theatre = require("../models/Theatre");

const createShow = async (req, res) => {
  try {
    const { theatre, screen } = req.body;

    const theatreDoc = await Theatre.findById(theatre);
    const screenDoc = await Screen.findById(screen);

    if (!theatreDoc) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    if (!screenDoc) {
      return res.status(404).json({ message: "Screen not found" });
    }

    if (String(theatreDoc.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (String(screenDoc.theatre) !== String(theatre)) {
      return res.status(400).json({ message: "Screen must belong to the selected theatre" });
    }

    const show = await Show.create(req.body);
    await show.populate([
      { path: "movie", select: "title" },
      { path: "theatre", select: "name" },
      { path: "screen", select: "name" },
    ]);

    res.json({ success: true, show });
  } catch (err) {
    res.status(500).json({ message: "Error creating show" });
  }
};

const getMyShows = async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.user.id }).select("_id");
    const theatreIds = theatres.map((t) => t._id);

    const shows = await Show.find({ theatre: { $in: theatreIds } })
      .populate("movie", "title")
      .populate("theatre", "name")
      .populate("screen", "name");

    res.json({ success: true, shows });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving shows" });
  }
};

const updateShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const theatreId = req.body.theatre || show.theatre;
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    if (String(theatre.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const screenId = req.body.screen || show.screen;
    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    if (String(screen.theatre) !== String(theatreId)) {
      return res.status(400).json({ message: "Screen must belong to the selected theatre" });
    }

    const fields = ["movie", "theatre", "screen", "date", "time", "ticketPrice"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        show[field] = req.body[field];
      }
    });

    await show.save();
    await show.populate([
      { path: "movie", select: "title" },
      { path: "theatre", select: "name" },
      { path: "screen", select: "name" },
    ]);

    res.json({ success: true, show });
  } catch (err) {
    res.status(500).json({ message: "Error updating show" });
  }
};

const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const theatre = await Theatre.findById(show.theatre);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    if (String(theatre.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await show.deleteOne();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting show" });
  }
};

module.exports = { createShow, getMyShows, updateShow, deleteShow };
