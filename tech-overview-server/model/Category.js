const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    length: 30
  },
  slug: {
    type: String,
    required: true,
    length: 20
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

module.exports = mongoose.model('Category', categorySchema)
