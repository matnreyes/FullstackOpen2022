import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteForAnecdote (state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteForAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.newAnecdote(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const setVote = (id) => {
  return async dispatch => {
    await anecdoteService.sendVote(id)
    dispatch(voteForAnecdote(id))
  }
}

export default anecdoteSlice.reducer