import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const anecdoteService = { getAll }

export default anecdoteService