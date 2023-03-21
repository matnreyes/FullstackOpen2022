import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('login')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
      setPage('authors')
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(newBook)}
      })
      window.alert(`New book "${newBook.title}" by ${newBook.author.name} has been added`)
    }
  })

  const notify = (notif) => {
    setMessage(notif)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    setPage('login')
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token 
          ? <>
              <button onClick={() => setPage('recommended')}>recommend</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Notify message={message}/>

      <Login show={page === 'login'} setToken={setToken} setError={notify}/>

      <Authors show={page === 'authors'} setError={notify} user={token}/>
      
      <Books show={page === 'books'} />

      <Recommended show={page === 'recommended'}/>

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
