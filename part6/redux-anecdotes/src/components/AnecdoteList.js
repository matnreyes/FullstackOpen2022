import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <li>
      <p>"{anecdote.content}"</p>
      votes: {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  return (
    <ul>
      {anecdotes.map(anecdote =>
          <Anecdote 
            anecdote={anecdote}
            key={anecdote.id}
            handleVote={() => 
              dispatch(voteForAnecdote(anecdote.id))
            }
          />
      )}
    </ul>
  )
}

export default AnecdoteList