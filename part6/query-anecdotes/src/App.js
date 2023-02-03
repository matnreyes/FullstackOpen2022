import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, submitVote } from './services/anecdoteService'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation(submitVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(n => n.id === updatedAnecdote.id ? updatedAnecdote : n))
    },
  })

  const handleVote = (anecdote) => {
   voteMutation.mutate(anecdote) 
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
    <div>
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
    </div>
  )
}

export default App
