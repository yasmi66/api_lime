const express = require("express");
const router = express.Router();
const path = require("path");
const { registerUser, loginUser } = require(path.resolve(__dirname, "../controllers/authController"));

// Routes for authentication 
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
