const listHelper = require('../utils/list_helper')
const testBlogs = require('../utils/testblogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = []
  listWithOneBlog.push(testBlogs[0])

  test('when list has ony one blog, equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})
