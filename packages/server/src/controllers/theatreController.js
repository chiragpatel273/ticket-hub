const Theatre = require("../models/Theatre");

const createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create({
      ...req.body,
      owner: req.user.id,
      status: "pending",
    });

    res.json({ success: true, theatre });
  } catch (err) {
    res.status(500).json({ message: "Error creating theatre" });
  }
};

const getMyTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.user.id });
    res.json({ success: true, theatres });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving theatres" });
  }
};

const approveTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );
    res.json({ success: true, theatre });
  } catch (err) {
    res.status(500).json({ message: "Error approving theatre" });
  }
};

const rejectTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );
    res.json({ success: true, theatre });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting theatre" });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner", "name email");
    res.json({ success: true, theatres });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving theatres" });
  }
};

module.exports = { createTheatre, getMyTheatres, approveTheatre, rejectTheatre, getAllTheatres };
