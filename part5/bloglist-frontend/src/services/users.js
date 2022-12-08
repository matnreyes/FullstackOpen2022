import axios from 'axios'

const baseUrl = ('/api/login')

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const userService = { login }

export default userService