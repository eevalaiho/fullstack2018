const mongoose = require('mongoose')
var Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = function(obj) {
  return {
    title: obj.title,
    author: obj.author,
    likes: obj.likes
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
