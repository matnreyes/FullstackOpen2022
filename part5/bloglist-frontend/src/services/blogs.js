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
    header: { Authorization: token }
  }
  console.log(token)
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}



export default { setToken, getAll, postBlog }