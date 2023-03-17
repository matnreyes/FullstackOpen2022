import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(undefined)

  const bookQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre
    }
  })

  if (bookQuery.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = bookQuery.data.allBooks
  const genres = [...new Set(books.reduce((a, b) => a.concat(b.genres),[]))]

  return (
    <div>
      <h2>books</h2>
      <div>
        <p>filter by genre: <strong>{selectedGenre}</strong></p>
        <div>
          {selectedGenre
            ? <button onClick={() => setSelectedGenre(undefined)}>clear filter</button>
            : genres.map(g => <button onClick={() => setSelectedGenre(g)} key={g}>{g}</button>)
          }
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
