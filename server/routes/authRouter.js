const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).json("User not found!");

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) res.status(400).json("wrong email or password!");
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
