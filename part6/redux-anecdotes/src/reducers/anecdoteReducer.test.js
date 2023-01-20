import deepFreeze from 'deep-freeze'
import anecdoteReducer, { increaseVote, newAnecdote } from './anecdoteReducer'
import { createStore } from 'redux'

let store;
let state;

describe('anecdote reducer', () => {
  beforeEach(() => {
    store = createStore(anecdoteReducer)
    state = store.getState()
    deepFreeze(state)
  })

  test('should increase vote count', () => {
    store.dispatch(increaseVote(state[0].id))
    const newState = store.getState()
    
    expect(newState[0].votes).toEqual(state[0].votes + 1)
  })

  test('can add a new anecdote', () => {
    const anecdote = 'This is the new anecdote'
    const addedAnecdote = store.dispatch(newAnecdote(anecdote))

    const newState = store.getState()

    expect(newState).toHaveLength(state.length + 1)
    expect(newState).toContainEqual(addedAnecdote.data)
  })
})