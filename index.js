// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const urlRoutes = require(path.resolve(__dirname, "./src/routes/urlRoutes"));
const authRoutes = require(path.resolve(__dirname, "./src/routes/authRoutes"));
const config = require(path.resolve(__dirname, "./src/config/config"));

const app = express();

app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/url", urlRoutes);
app.use("/auth", authRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
