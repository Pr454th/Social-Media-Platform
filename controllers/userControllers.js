const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  const { artistname, password, email, phone } = req.body;
  const user = new User({
    artistname: artistname,
    password: password,
    email: email,
    phone: phone,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user != null) {
      if (user.password === password) {
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
          sameSite: "strict",
        });

        user.password = "";
        res.status(200).json({ user: user });
        return;
      }
      res.status(200).json({ error: "Wrong password" });
    } else {
      res.status(200).json({ error: "User not found" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const logoutUser = async (req, res) => {
  console.log("logout");
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });
  res.status(200).json({ loggedOut: 1 });
};

const protect = async (req, res) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      res.status(401).json({ id: null });
      return;
    }
    console.log(user);
    user.password = "";
    res.status(200).json({ user: user });
  } catch (err) {
    res.json({ id: null });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { artistname: req.params.id },
      { password: 0 }
    ).populate("posts", ["title", "_id"]);
    if (!user) {
      res.status(401).json({ message: "No User Found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  protect,
  getUser,
};
