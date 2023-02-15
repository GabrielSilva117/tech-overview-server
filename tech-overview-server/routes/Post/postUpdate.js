const mongoose = require('mongoose')
require('../../model/Post')
const Post = mongoose.model('Post')
require('../../model/Category')
const Category = mongoose.model('Category')
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

  if (title) {
    const postInfo = await Post.findOne({ title })
    if (postInfo) {
      return res.status(403).json({
        Forbidden: 'This title is already in use'
      })
    }
    if (title.length > 30) {
      return res.status(403).json({
        Forbidden:
          'The title is too long, the maximum length of a title is 30 chars'
      })
    }
  }

  if (category) {
    if (category.length !== 24) {
      return res.status(401).json({
        msg: 'Invalid category Id! Try again.'
      })
    }
    const categoryInfo = await Category.findOne({ _id: category })
    if (!categoryInfo) {
      return res.status(404).json({
        msg: 'The id provided is either invalid or it belongs to a deleted category, try again.'
      })
    }
  }

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
