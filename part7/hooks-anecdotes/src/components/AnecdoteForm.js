import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdote = useField('text')

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    dispatch(createAnecdote(anecdote.value))
    dispatch(sendNotification(`Added ${anecdote.value}`, 5))
    anecdote.reset()
  }

  return (
    <form onSubmit={createNewAnecdote}>
      <input { ...anecdote }/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm