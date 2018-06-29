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

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0)
    return null

  let _ = require('lodash')
  //let blogs_by_author = _.groupBy(blogs, blog => blog.author)

  let author_counts = _.chain(blogs)
    .groupBy('author')
    .map((authors_blogs, author) => ({
      'author': author,
      'likes': _.sumBy(authors_blogs, 'likes'),
    }))
    .value()

  let top = { 'author':null,'likes':0 }
  author_counts.forEach(function(item) {
    if (item.likes > top.likes)
      top = item
  })

  return top
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
