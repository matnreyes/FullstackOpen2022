import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(sendNotification(`Added ${anecdote}`, 5))
  }

  return (
    <form onSubmit={createNewAnecdote}>
      <input name="anecdote"/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm