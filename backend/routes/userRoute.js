const express = require("express");
const router = express.Router();
const User = require("../model/User");
const generateToken = require("../config/generateToken");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password) {
      res.status(400).json("Please enter all fields!");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json("User already exists");
    }
    const user = new User({ name, email, password, picture });
    const newUser = await user.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", protect, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json(users);
});

module.exports = router;
