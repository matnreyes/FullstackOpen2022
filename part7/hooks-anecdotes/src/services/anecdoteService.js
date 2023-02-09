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

const sendVote = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`)
  return response.data
}

const anecdoteService = { getAll, newAnecdote, sendVote }

export default anecdoteService