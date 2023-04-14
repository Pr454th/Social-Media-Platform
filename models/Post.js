const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  imageData: {
    type: String,
    required: false,
    default: "",
  },
  comments: [
    {
      ref: "Comment",
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
