import { createAnecdote } from '../services/anecdoteService'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const setNotifcation = (content) => {
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: content})
    setTimeout(() => {
      dispatchNotification({ type: 'RESET' })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote.data.content))
      setNotifcation(`Added: ${newAnecdote.data.content}`)
    },
    onError: ({ response }) => {
      setNotifcation(`Error: ${response.data.error}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
