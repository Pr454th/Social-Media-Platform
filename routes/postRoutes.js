const express = require("express");
const router = express.Router();
const { savePost, getPost } = require("../controllers/postControllers");
const {
  createUser,
  loginUser,
  protect,
  getUser,
  getUserName,
} = require("../controllers/userControllers");

// GET BACK ALL THE POSTS
router.route("/posts").post(savePost);
router.route("/posts/:id").get(getPost);

//USER ROUTES
// router.route("/").get(getUsers);
router.route("/auth/register").post(createUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/protect").get(protect);
router.route("/users/:id").get(getUser);
router.route("/:mail").get(getUserName);

module.exports = router;
