const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
