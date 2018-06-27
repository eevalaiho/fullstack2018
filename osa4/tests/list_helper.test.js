const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('totalLikes is called', () => {
  const blogs = []

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(0)
})