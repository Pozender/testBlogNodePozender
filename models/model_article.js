const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  markdown: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
