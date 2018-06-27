const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function(cnt,b) { return cnt + b.likes }, 0)
}

module.exports = {
  dummy,
  totalLikes
}
