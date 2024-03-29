// eslint-disable-next-line object-curly-newline
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} = require('../utils/list_helper')

const testBlogs = require('../utils/testblogs')

const listWithOneBlog = [testBlogs[0]]
const noBlogs = []

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

describe('most blogs', () => {
  test('when one author wrote the most', () => {
    const result = mostBlogs(testBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when one author has the most', () => {
    const result = mostLikes(testBlogs)
    const mostPopular = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(mostPopular)
  })
})
