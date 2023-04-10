const express = require("express");
const router = express.Router();
const { savePost, getPost } = require("../controllers/postControllers");

// GET BACK ALL THE POSTS
router.route("/").post(savePost).get(getPost);

module.exports = router;
