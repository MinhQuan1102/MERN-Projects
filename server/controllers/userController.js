const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({success: false, message: 'User not found!'})
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await user.findByIdAndDelete(userId)
    if (!user) {
      res.status(404).json({success: false, message: 'user not found!'})
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllUsers, getUser, deleteUser }