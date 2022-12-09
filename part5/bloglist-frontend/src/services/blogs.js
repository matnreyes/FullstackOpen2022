import axios from 'axios'
const baseUrl = '/api/blogs'
let token = 0

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const updateBlog = async (blogObject) => {

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const blogService = { setToken, getAll, postBlog, updateBlog }

export default blogService