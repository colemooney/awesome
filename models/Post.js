const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const postSchema = new Schema({
  image: String,
  text: String,
  author: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;