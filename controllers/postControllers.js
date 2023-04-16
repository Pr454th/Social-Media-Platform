const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Buffer = require("buffer").Buffer;

const savePost = async (req, res) => {
  const { title, description, artist } = req.body;
  const buffer = Buffer.from(req.body.image, "base64");
  const post = new Post({
    title: title,
    description: description,
    image: buffer,
    artist: artist,
  });
  try {
    const savedPost = await post.save();
    await User.updateOne(
      { artistname: artist },
      { $push: { posts: savedPost._id } }
    );
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate(
      "comments",
      ["comment", "user"]
    );

    if (!post) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageData = post.image.toString("base64");
    const imageSrc = `data:image/jpeg;base64,${imageData}`;

    res.json({
      _id: post._id,
      title: post.title,
      description: post.description,
      imageSrc: imageSrc,
      artist: post.artist,
      comments: post.comments,
      imageData: "",
    });
  } catch (err) {
    res.status(500).json({ message: "not working" });
  }
};

const imageSrc = (image) => {
  const imageData = image.toString("base64");
  const imageSource = `data:image/jpeg;base64,${imageData}`;
  return imageSource;
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    for (let i = 0; i < posts.length; i++) {
      posts[i].imageData = imageSrc(posts[i].image);
    }
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
};

const getPostIds = async (req, res) => {
  try {
    const posts = await Post.find({}, { _id: 1 });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
};

const saveComment = async (req, res) => {
  const { comment, user, postid } = req.body;
  const newComment = new Comment({
    comment: comment,
    user: user,
  });
  try {
    const savedComment = await newComment.save();
    await Post.updateOne(
      { _id: postid },
      { $push: { comments: savedComment._id } }
    );
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  savePost,
  getPost,
  getPosts,
  getPostIds,
  saveComment,
};
