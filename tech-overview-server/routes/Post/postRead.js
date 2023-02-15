const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
require('../../model/Post')
const Post = mongoose.model('Post')

router.get('/post', async (req, res) => {
  const title = req.body.title
  if (title) {
    const postContent = await Post.findOne({ title })
    if (!postContent) {
      return res.status(404).json({
        msg: `There is no Post with the title of: ${title}`
      })
    }
    return res.status(200).json(postContent)
  }
  const posts = await Post.find({})

  if (posts.length === 0) {
    return res.status(200).json({
      msg: 'No posts available'
    })
  }

  return res.status(200).json(posts)
})

module.exports = router
