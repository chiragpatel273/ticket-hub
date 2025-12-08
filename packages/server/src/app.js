const express = require("express");
const cors = require("cors");

// const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const adminMovieRoutes = require("./routes/adminMovieRoutes");
const authMiddleware = require("./middlewares/auth");
const theatrePartnerRoutes = require("./routes/theatrePartnerRoutes");
const theatreAdminRoutes = require("./routes/theatreAdminRoutes");
const screenPartnerRoutes = require("./routes/screenPartnerRoutes");
const showPartnerRoutes = require("./routes/showPartnerRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// PUBLIC
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/movies", adminMovieRoutes);
app.use("/api/partner/theatres", theatrePartnerRoutes);
app.use("/api/admin/theatres", theatreAdminRoutes);
app.use("/api/partner/screens", screenPartnerRoutes);
app.use("/api/partner/shows", showPartnerRoutes);
app.use("/api/movies", movieRoutes);

// PROTECTED TEST ROUTE
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

// Movies route (public for now)
// app.use("/api/movies", movieRoutes);

module.exports = app;
