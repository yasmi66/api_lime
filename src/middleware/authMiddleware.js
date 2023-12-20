const jwt = require("jsonwebtoken");
const path = require("path");
const config = require(path.resolve(__dirname, "../config/config"));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    console.log("Decoded user information:", decoded);
    next();
  } catch (err) {
    console.log("Error decoding token:", err);
    return res.status(403).json({ message: "Forbidden" });
  }
}

module.exports = { authenticateToken };

