const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend (JS) is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
