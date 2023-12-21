const path = require("path");
const Url = require(path.resolve(__dirname, "../models/Url"));
const User = require(path.resolve(__dirname, "../models/User"));
const shortid = require("shortid");

// Create short link
async function createUrl(req, res) {
  const { originalUrl } = req.body;
  const userId = req.user._id;

  try {
    let shortUrl = shortid.generate();

    // Check if the generated shortUrl already exists, and regenerate if necessary
    while (await Url.findOne({ shortUrl })) {
      shortUrl = shortid.generate();
    }

    const url = new Url({
      originalUrl,
      shortUrl,
      user: userId,
    });

    await url.save();

    // Update the user's shortUrls array
    const user = await User.findById(userId);

    console.log("userId:", userId);
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.shortUrls) {
      user.shortUrls = [];
    }

    user.shortUrls.push(url._id);
    await user.save();

    res.status(201).json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Decode short link
async function decodeUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete short link
async function deleteUrl(req, res) {
  const shortUrl = req.params.shortUrl;
  const userId = req.user._id;

  try {
    const url = await Url.findOne({ shortUrl, user: userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    console.log("Found URL:", url);

    await url.remove();
    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createUrl, decodeUrl, deleteUrl };
