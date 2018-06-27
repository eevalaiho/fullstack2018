const mongoose = require('mongoose')
var Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
