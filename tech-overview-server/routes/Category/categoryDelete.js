const mongoose = require('mongoose')
require('../../model/Category')
const Category = mongoose.model('Category')
const express = require('express')
const { json } = require('body-parser')
const router = express.Router()

router.delete('/category/:id', async (req, res) => {
  const catId = req.params.id

  if (catId.length !== 24) {
    return res.status(401).json({
      msg: 'Invalid id! Try again.'
    })
  }

  const category = await Category.findOne({ _id: catId })
  if (!category) {
    return res.status(404).json({
      msg: 'This id is either invalid or it doesn´t exists'
    })
  }

  await Category.findByIdAndDelete({ _id: catId })
  return res.status(200).json({
    msg: 'Category deleted successfully!'
  })
})

module.exports = router
