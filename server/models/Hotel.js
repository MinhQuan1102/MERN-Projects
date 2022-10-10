const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['hotel', 'apartment', 'resort', 'villa', 'cabin'],
    required: true
  },
  city: {
    type: String, 
    required: true
  },
  address: {
    type: String, 
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  photos: {
    type: [String]
  },
  title: {
    type: String,
    required: true
  }, 
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  rooms: {
    type: [String]
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Hotel", HotelSchema)