const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

//@description    Register new user
//@route          POST /api/auth/register
//@access         Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json("Please enter all fields!");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      fullName: firstName + " " + lastName,
      password: hashedPassword,
    });
    const newUser = await user.save();
    return res
      .status(201)
      .json({ message: "Register user successfully!", user: newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    Login
//@route          POST /api/auth/login
//@access         Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json("Wrong email or password!");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json("Wrong email or password!");
    const token = generateToken(user._id)
    const { password: userPass, ...other } = user._doc;
    return res
      .status(200)
      .json({ message: "Login successfully!", user: {...other, token} });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    Login success
//@route          GET /api/auth/login/success
//@access         Public
const loginSuccess = (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ success: true, message: "successful", user: req.user });
  }
};

//@description    Logout
//@route          GET /api/auth/logout
//@access         Public
const logout = (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
};

//@description    Register new user
//@route          GET /api/auth/login/failed
//@access         Public
const loginFail = (req, res) => {
  res.status(401).json({ success: false, message: "failure" });
};

module.exports = { registerUser, loginUser, loginSuccess, logout, loginFail };
