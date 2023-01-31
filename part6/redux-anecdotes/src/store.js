import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})