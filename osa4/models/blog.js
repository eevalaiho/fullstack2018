const mongoose = require('mongoose')
var Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = function(obj) {
  return {
    title: obj.title,
    author: obj.author,
    url: obj.url,
    likes: obj.likes,
    user: obj.user
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
