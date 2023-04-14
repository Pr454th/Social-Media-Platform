const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  artistname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  posts: [
    {
      ref: "Post",
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
