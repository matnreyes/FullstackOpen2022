import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



describe('<Blog />', () => {
  test('only redners title and author', () => {
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

  test('renders likes and url when button is clicked', async () => {
    const blog = {
      title: 'testBlog',
      author: 'testAuthor',
      url: 'opjndf.com',
      user: {
        username: 'testUser'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const div = container.querySelector('.moreInfo')
    const button = screen.getByText('expand')

    await user.click(button)

    expect(div).not.toHaveStyle('display: none')
  })
})