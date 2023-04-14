const express = require("express");
const router = express.Router();
const {
  savePost,
  getPost,
  getPosts,
  saveComment,
} = require("../controllers/postControllers");
const {
  createUser,
  loginUser,
  protect,
  getUser,
  getUserName,
} = require("../controllers/userControllers");

// GET BACK ALL THE POSTS
router.route("/posts").post(savePost).get(getPosts);
router.route("/posts/:id").get(getPost);

//USER ROUTES
// router.route("/").get(getUsers);
router.route("/auth/register").post(createUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/protect").get(protect);
router.route("/users/:id").get(getUser);
router.route("/:mail").get(getUserName);

//COMMENT ROUTES
router.route("/comments").post(saveComment);

module.exports = router;
