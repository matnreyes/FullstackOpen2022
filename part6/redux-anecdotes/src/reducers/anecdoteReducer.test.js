import deepFreeze from 'deep-freeze'
import anecdoteReducer, { increaseVote } from './anecdoteReducer'
import { createStore } from 'redux'

describe('anecdote reducer', () => {
  test('should increase vote count', () => {
    const store = createStore(anecdoteReducer)

    const state = store.getState()

    deepFreeze(state)
    store.dispatch(increaseVote(state[0].id))
    const newState = store.getState()
    
    expect(newState[0].votes).toEqual(state[0].votes + 1)
  })
})