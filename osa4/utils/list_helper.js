

const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function(cnt,b) { return cnt + b.likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0)
    return null
  const max = blogs.reduce((max, b) => b.likes > max ? b.likes : max, blogs[0].likes)
  return blogs.filter((blog) => blog.likes === max)[0]
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0)
    return null

  let _ = require('lodash')
  let topauthor = { 'author':null,'blogs':0 }
  let author_counts = _.countBy(blogs, blog => blog.author)
  for (var author in author_counts) {
    if (author_counts[author] > topauthor['blogs']) {
      topauthor['author'] = author
      topauthor['blogs'] = author_counts[author]
    }
  }
  return topauthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
