const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const hotel = await User.findById(req.params.id);
    res.status(200).json({ success: true, message: "Get single user", hotel });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const {
    username, email, password
  } = req.body;
  try {
    let updatedUser = {
      username, email, password
    };
    updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, message: "User updated!", updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted", deletedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
