import { rest } from 'msw'
import { initialState } from '../db'

export const handlers = [
  rest.get('/api/anecdotes'), (req, res, ctx) => {
    return res(
      ctx.json(initialState)
    )
  }
]