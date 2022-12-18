import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('<Blog /> only rredners title and author', () => {
  const blog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'opjndf.com'
  }

  render(<Blog blog={blog}/>)
  screen.debug()
})