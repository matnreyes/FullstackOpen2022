import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`Added ${anecdote}`))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <form onSubmit={createNewAnecdote}>
      <input name="anecdote"/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm