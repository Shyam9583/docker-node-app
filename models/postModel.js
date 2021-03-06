const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post must have title"],
  },
  body: {
    type: String,
    required: [true, "Post must have a body"],
  },
});

module.exports = mongoose.model("Post", postSchema);
