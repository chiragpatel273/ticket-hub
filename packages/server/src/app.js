const express = require("express");
const cors = require("cors");

// const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(express.json());

// PUBLIC
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

app.use("/api/auth", authRoutes);

// PROTECTED TEST ROUTE
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

// Movies route (public for now)
// app.use("/api/movies", movieRoutes);

module.exports = app;
