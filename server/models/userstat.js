const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  _id: { type: String, require: true },
  year: { type: Number, require: true },
  month: { type: Number, require: true },
  date: { type: Number, require: true },
  count: { type: Number, require: true }
});

module.exports = mongoose.model("pageviews", userSchema);
