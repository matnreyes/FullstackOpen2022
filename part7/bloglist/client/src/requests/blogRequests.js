import axios from 'axios'

const baseUrl = '/api/blogs'

const config = {
  headers: { Authorization: 'bearer ' }
}

export const setToken = (token) => {
  config.headers.Authorization += token
  return config
}

export const fetchBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const postBlog = (newBlog) =>
  axios.post(baseUrl, newBlog, config).then((res) => res.data)

export const deleteBlog = (id) => axios.delete(`${baseUrl}/${id}`, config)

export const likeBlog = (blog) =>
  axios
    .put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 }, config)
    .then((res) => res.data)
