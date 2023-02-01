import { rest } from 'msw'
import { initialState } from '../db'

export const handlers = [
  rest.get('/api/anecdotes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(initialState),
      )
  })
]