const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
mongoose.Promise = Promise;


const postSchema = new Schema({
  title: String,
  image: String,
  text: String,
  author: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;