const mongoose = require('mongoose')
require('../../model/Category')
const Category = mongoose.model('Category')
const express = require('express')
const router = express.Router()

router.get('/category', async (req, res) => {
  const categories = await Category.find({})
  if (categories.length === 0) {
    return res.status(404).json({
      msg: 'No categories available'
    })
  }
  return res.status(200).json(categories)
})

module.exports = router
