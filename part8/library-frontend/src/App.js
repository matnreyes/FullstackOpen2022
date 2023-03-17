import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('login')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (notif) => {
    setMessage(notif)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify message={message} />
        <Login setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify message={message}/>

      <Authors show={page === 'authors'} setError={notify}/>
      
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
