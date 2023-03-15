import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)

  const notify = (notif) => {
    setMessage(notif)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify message={message}/>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify}/>
    </div>
  )
}

const Notify = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ color: 'red', border: 3}}>
      {message}
    </div>
  )
}

export default App
