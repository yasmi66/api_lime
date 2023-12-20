const express = require("express");
const router = express.Router();
const path = require("path");

const urlController = require(path.resolve(__dirname, "../controllers/urlController"));
const { authenticateToken } = require(path.resolve(__dirname, "../middleware/authMiddleware"));

// Routes for URL shortener
router.post("/create", authenticateToken, urlController.createUrl);
router.get("/decode/:shortUrl", urlController.decodeUrl);
router.delete("/delete/:shortUrl", authenticateToken, urlController.deleteUrl);

module.exports = router;
