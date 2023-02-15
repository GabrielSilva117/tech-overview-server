const mongoose = require('mongoose')
require('../../model/Category')
const Category = mongoose.model('Category')
const express = require('express')
const router = express.Router()

router.put('/category/:id', async (req, res) => {
  const catId = req.params.id

  if (catId.length !== 24) {
    return res.status(401).json({
      msg: 'Invalid categoty Id! Try again.'
    })
  }

  const category = await Category.findOne({ _id: catId })
  if (!category) {
    return res.status(404).json({
      msg: 'The provided category id doesnt exist'
    })
  }

  const { name, slug } = req.body

  if (name) {
    if (name.length > 15) {
      return res.status(401).json({
        msg: 'The new category name is too big, the maximum size is 15 characters'
      })
    }
    const catInfo = await Category.findOne({ name })
    if (catInfo) {
      return res.status(401).json({
        msg: 'This category name already exists'
      })
    }
  }

  if (slug) {
    if (slug.length > 25) {
      return res.status(401).json({
        msg: 'The new slug is too big (maxLength = 25 chars)'
      })
    }
  }

  await Category.updateOne(
    { _id: catId },
    {
      name: name && name,
      slug: slug && slug
    }
  )
  return res.status(200).json({
    msg: 'Category updated successfully!'
  })
})

module.exports = router
