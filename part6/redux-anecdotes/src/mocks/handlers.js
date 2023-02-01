import { rest } from 'msw'
import dbData from '../db.json'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

let { anecdotes } = dbData

export const handlers = [
  rest.get('/api/anecdotes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(anecdotes),
      )
  }),

  rest.post('/api/anecdotes', (req, res, ctx) => {
    const newAnecdote = asObject(req.body)
    anecdotes = anecdotes.concat(newAnecdote)
    return res(
      ctx.status(201),
      ctx.json(newAnecdote)
    )
  })
]