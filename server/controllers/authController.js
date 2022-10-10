const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('../util/error')

const register = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body
  try {
    if (!username || !email || !password || !confirmPassword) {
      return next(createError(400, 'Please provide enough information!'))
    }
    const user = await User.findOne({ username })
    if (user) {
      return next(createError(400, 'Username has been used!'))
    }
    const userEmail = await User.findOne({ email })
    if (userEmail) {
      return next(createError(400, 'Email has been used!'))
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt) 
    if (password !== confirmPassword) {
      return next(createError(400, 'Passwords do not match!'))
    }
    const newUser = new User({ ...req.body, password: hashPassword })
    await newUser.save()
    res.status(200).json({ success: true, message: 'User created!', newUser })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return next(createError(400, 'Wrong password or username!'))
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong password or username!'))
    }
    const token = jwt.sign({
      id: user._id, idAdmin: user.isAdmin
    }, process.env.JWT_SECRET)
    const { password, ...otherDetails } = user._doc
    res.cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json({ success: true, message: 'Login successfully', details: {...otherDetails}})
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login }