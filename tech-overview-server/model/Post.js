const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    length: 30,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
})

module.exports = mongoose.model('Post', postSchema)
