require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  secretKey: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};
