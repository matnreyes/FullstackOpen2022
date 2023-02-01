import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`Added ${anecdote}`))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <form onSubmit={createAnecdote}>
      <input name="anecdote"/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm