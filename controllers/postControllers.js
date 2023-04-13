const Post = require("../models/Post");
const fs = require("fs");
const Buffer = require("buffer").Buffer;

const savePost = async (req, res) => {
  console.log(req.body);
  const { title, description, artist } = req.body;
  const buffer = Buffer.from(req.body.image, "base64");
  console.log(buffer);
  const post = new Post({
    title: title,
    description: description,
    image: buffer,
    artist: artist,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.id });

    if (!post) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageData = post.image.toString("base64");
    const imageSrc = `data:image/jpeg;base64,${imageData}`;

    res.json({
      title: post.title,
      description: post.description,
      imageSrc: imageSrc,
    });
  } catch (err) {
    res.status(500).json({ message: "not working" });
  }
};

module.exports = {
  savePost,
  getPost,
};
