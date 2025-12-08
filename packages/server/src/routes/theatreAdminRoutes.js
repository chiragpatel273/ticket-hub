const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
  approveTheatre,
  rejectTheatre,
  getAllTheatres,
} = require("../controllers/theatreController");

router.use(auth);
router.use(admin);

// Get all theatres
router.get("/", getAllTheatres);

// Approve
router.put("/:id/approve", approveTheatre);

// Reject
router.put("/:id/reject", rejectTheatre);

module.exports = router;
