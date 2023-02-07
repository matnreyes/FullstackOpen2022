import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, submitVote } from './services/anecdoteService'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import notificationReducer from './reducers/notificationReducer'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const voteMutation = useMutation(submitVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(n => n.id === updatedAnecdote.id ? updatedAnecdote : n))
    },
  })

  const handleVote = (anecdote) => {
    changeNotification(`Voted for: ${anecdote.content}`)
    voteMutation.mutate(anecdote) 
  }

  const changeNotification = (content) => {
    notificationDispatch({ type: "SET_NOTIFICATION", payload: content})

    setTimeout(() => {
      notificationDispatch({ type: "RESET" })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if ( result.isLoading ) {
    return <div> loading... </div>
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3> 
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export default App
