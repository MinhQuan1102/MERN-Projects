const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  password: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  address: {
    type: String, 
  },
  country: {
    type: String,
  },
  img: {
    type: String,
  },
  city: {
    type: String,
  }, 
  phone: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("User", UserSchema)