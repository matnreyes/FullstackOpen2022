import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const anecdoteService = { getAll, newAnecdote }

export default anecdoteService