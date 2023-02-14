const mongoose = require('mongoose')
require('../../model/Post')
const Post = mongoose.model('Post')
const express = require('express')
const router = express.Router()

router.put('/post/:id', async (req, res) => {
  const postId = req.params.id
  if (!postId || postId.length !== 24) {
    return res.status(403).json({
      Forbidden: 'You must pass a valid post id'
    })
  }

  const { title, msg, category } = req.body

  const post = await Post.findOne({ _id: postId })
  if (!post) {
    return res.status(404).json({
      Forbidden:
        'This post id is either invalid or it belongs to a deleted post! Try againg using a valid id'
    })
  }
  const newPost = await Post.updateOne(
    { _id: postId },
    {
      title: title && title,
      body: msg && msg,
      category: category && category
    }
  )
  return res.status(200).json(newPost)
})

module.exports = router
