const Post = require("../models/Post");
const fs = require("fs");
const Buffer = require("buffer").Buffer;

const savePost = async (req, res) => {
  console.log(req.body);
  if (!req.body.title) {
    return res.status(400).send("title is required");
  }
  if (!req.body.image) {
    return res.status(400).send("Missing fields");
  }
  if (!req.body.description) {
    return res.status(400).send("description is required");
  }

  const imageData = req.body.image.split(";base64,").pop();
  const imageType = req.body.image.split(";")[0].split("/")[1];
  const title = req.body.title;
  const description = req.body.description;

  const data = Buffer.from(imageData, "base64");
  const contentType = `image/${imageType}`;

  // save image data to database
  const post = new Post({
    title: title,
    description: description,
    image: data,
  });
  try {
    const savedPost = await post.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error saving image data to database");
      }

      console.log("Image data saved to database");
      res.send(image);
    });
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

const getPost = async (req, res) => {
  try {
    console.log(req.body.title);
    const post = await Post.findOne({ title: req.body.title });
    if (!post) {
      return res.status(404).send("Image not found");
    }
    const bufferData = Buffer.from(post.image.data); // retrieve buffer directly
    fs.writeFile(
      `./images/${req.body.title}.${post.image.contentType.split("/")[1]}`,
      bufferData,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error saving image file");
        }
        return res.status(200).send("Image file saved successfully");
      }
    );
    res.send(post.image);
  } catch (err) {
    res.status(500).json({ message: "not working" });
  }
};

module.exports = {
  savePost,
  getPost,
};
