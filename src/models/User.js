const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  shortUrls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Url' }],
}, { toJSON: { virtuals: true } });

userSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("User", userSchema);