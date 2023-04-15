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
    const user = User.findOne(
      { email: email, password: password },
      { password: 0 }
    );
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    const payload = { email: email, password: password };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const protect = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(401).json({ authorized: false });
      return;
    }
    res.json({ authorized: true });
  } catch (err) {
    res.json({ authorized: false });
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

const getUserName = async (req, res) => {
  try {
    const name = await User.findOne(
      { email: req.params.mail },
      { artistname: 1 }
    );
    if (!name) {
      res.status(401).json({ message: "No User Found" });
      return;
    }
    res.json(name);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  createUser,
  loginUser,
  protect,
  getUser,
  getUserName,
};
