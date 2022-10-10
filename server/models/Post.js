const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String, 
    required: true
  }, 
  description: {
    type: String
  },
  url: {
    type: String
  },
  status: {
    type: String,
    enum: ['TO LEARN', 'LEARNING', 'LEARNED']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = mongoose.model('posts', PostSchema)