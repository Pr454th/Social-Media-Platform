const express = require("express");
const router = express.Router();
const {
  savePost,
  getPost,
  getPosts,
  saveComment,
  getPostIds,
} = require("../controllers/postControllers");
const {
  createUser,
  loginUser,
  protect,
  getUser,
} = require("../controllers/userControllers");

// GET BACK ALL THE POSTS
router.route("/posts").post(savePost).get(getPosts);
router.route("/posts/ids").get(getPostIds);
router.route("/posts/:id").get(getPost);

//USER ROUTES
// router.route("/").get(getUsers);
router.route("/auth/register").post(createUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/protect").get(protect);
router.route("/users/:id").get(getUser);

//COMMENT ROUTES
router.route("/comments").post(saveComment);

module.exports = router;
