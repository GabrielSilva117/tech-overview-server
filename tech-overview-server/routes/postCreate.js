const mongoose = require('mongoose')
require('../model/Post')
const Post = mongoose.model('Post')
const express = require('express')
const { reset } = require('nodemon')

const router = express.Router()

router.post('/post', async (req, res) => {
  const { title, msg } = req.body

  if (!title || !msg) {
    return res.status(401).json({
      Forbidden: 'You must fill every required information for the post'
    })
  }

  if (title.length > 50 || title.length <= 0) {
    return (
      res.status(401),
      json({
        Forbidden: 'The title length is either too short or too big. Try again!'
      })
    )
  }

  const post = await Post.create({ title, body: msg }, (err, done) => {
    if (err) {
      return res.sendStatus(401)
    }
  })

  console.log(post)
})

module.exports = router
