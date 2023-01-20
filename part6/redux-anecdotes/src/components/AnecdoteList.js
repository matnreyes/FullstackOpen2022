import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <ul>
      {anecdotes.map(anecdote =>
          <Anecdote 
            anecdote={anecdote}
            key={anecdote.id}
            handleVote={() => 
              dispatch(increaseVote(anecdote.id))
            }
          />
      )}
    </ul>
  )
}

export default AnecdoteList