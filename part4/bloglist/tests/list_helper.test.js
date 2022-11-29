const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')
const testBlogs = require('../utils/testblogs')

const listWithOneBlog = [testBlogs[0]]

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has ony one blog, equals the like of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const multipleFave = [testBlogs[0], testBlogs[1], testBlogs[5]]
  const noBlogs = []

  test('when there are no blogs', () => {
    const result = favoriteBlog(noBlogs)
    expect(result).toBe(null)
  })

  test('when there are multiple favorites', () => {
    const result = favoriteBlog(multipleFave)
    expect(result.likes).toBe(5)
  })

  test('when there is only one blog', () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result.likes).toBe(5)
  })

  test('when there is only one favorite', () => {
    const result = favoriteBlog(testBlogs)
    expect(result.likes).toBe(12)
  })
})
