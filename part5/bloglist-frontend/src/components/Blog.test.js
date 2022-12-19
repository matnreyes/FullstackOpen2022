import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('<Blog /> only rredners title and author', () => {
  const blog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'opjndf.com',
    user: {
      username: 'testUser'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.moreInfo')


  expect(div).toHaveStyle('display: none')
})