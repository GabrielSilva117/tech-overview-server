const mongoose = require('mongoose')
const express = require('express')
const posts = require('./routes/postCreate')
const category = require('./routes/categoryCreate')
const bodyParser = require('body-parser')

const app = express()
const port = 3001 || process.env.PORT

app.use(
  bodyParser.json({
    limit: '5mb'
  })
)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

try {
  app.get('/', (req, res) => {
    res.send('Hello, World!')
  })

  app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`)
  })

  app.use('/posts', posts)
  app.use('/category', category)

  mongoose.set('strictQuery', true)
  mongoose
    .connect('mongodb://127.0.0.1:27017/tech_over_db')
    .then(console.log('Database Connected'))
    .catch((e) => {
      console.error(e)
    })
} catch (e) {
  console.error(e)
}
