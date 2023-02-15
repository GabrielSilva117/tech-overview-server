const mongoose = require('mongoose')
require('../../model/Post')
const Post = mongoose.model('Post')
require('../../model/Category')
const Category = mongoose.model('Category')
const express = require('express')

const router = express.Router()

router.post('/post', async (req, res) => {
  const { title, msg, catId } = req.body

  if (!title || !msg || !catId) {
    return res.status(401).json({
      Forbidden: 'You must fill every required information for the post'
    })
  }

  if (title.length > 50 || title.length <= 0) {
    return res.status(401).json({
      Forbidden: 'The title length is either too short or too big. Try again!'
    })
  }

  const Cat = await Category.findById({ _id: catId })
  if (!Cat) {
    return res.status(403).json({
      Forbidden: 'You must select a valid category for the post'
    })
  }

  await Post.create({ title, body: msg, category: catId }, (err, done) => {
    if (err) {
      return res.sendStatus(401)
    }
    return res.status(201).json(done)
  })
})

module.exports = router
