const express = require("express");
const { register, login, authMe } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, authMe);

module.exports = router;
