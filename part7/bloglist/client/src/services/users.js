import axios from 'axios'

const baseUrl = ('/api/login')

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const newUser = async (credentials) => {
  const response = await axios.post('/api/users', credentials)
  return response.data
}

const userService = { login, newUser }

export default userService