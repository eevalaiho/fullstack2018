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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
