const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
require('../../model/Post')
const Post = mongoose.model('Post')

router.delete('/post/:id', async (req, res) => {
  const postId = req.params.id

  if (!postId || postId.length !== 24) {
    return res.status(403).json({
      Forbidden: 'You must pass a valid id to delete the desired post'
    })
  }

  const post = await Post.findById({ _id: postId })
  if (!post) {
    return res.status(404).json({
      msg: 'The provided post id is invalid, try again using a correct id'
    })
  }

  await Post.findByIdAndDelete({ _id: postId })
  return res.status(200).json({
    msg: 'Post deleted successfully!'
  })
})

module.exports = router
