import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const config = {
  headers: { Authorization: 'bearer ' }
}

export const setToken = (token) => {
  config.headers.Authorization += token
  return config
}



export const fetchBlogs = () =>
  axios.get(baseUrl).then(res => res.data)

export const postBlog = newBlog =>
  axios.post(baseUrl, newBlog, config).then(res => res.data)

export const deleteBlog = id =>
  axios.delete(`${baseUrl}/${id}`, config)