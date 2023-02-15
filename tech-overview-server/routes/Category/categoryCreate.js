const mongoose = require('mongoose')
require('../../model/Category')
const Category = mongoose.model('Category')
const express = require('express')

const router = express.Router()

router.post('/category', async (req, res) => {
  const { name, slug } = req.body

  if (!name || !slug) {
    return res.status(401).json({
      Forbidden: 'You must fill the required information'
    })
  }

  if (name.length > 30) {
    return res.status(401).json({
      Forbidden:
        'The category name surpass the limit of 30 characters. Try again!'
    })
  }

  if (slug.length > 20) {
    return res.status(401).json({
      Forbidden: 'The slug name must contain a maximum length of 20 characters'
    })
  }

  await Category.create(
    {
      name,
      slug
    },
    (err, done) => {
      if (err) {
        return res.sendStatus(500)
      }
      return res.status(201).json(done)
    }
  )
})

module.exports = router
