import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommended = ({ show }) => {
  const [userFavorite, setUserFavorite] = useState(undefined)
  const userResult = useQuery(FAVORITE_GENRE, {
    skip: !show
  })
  const bookResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: userFavorite,
    },
    skip: !userFavorite
  })

  useEffect(() => {
    if (userResult.data) {
      setUserFavorite(userResult.data.me.favoriteGenre)
    }
  }, [userResult.data])

  if (!show) {
    return null
  }

  if (userResult.loading || bookResult.loading || !bookResult.called) {
    return <div>loading...</div>
  }

  return (
    <>
      <h2>recomended</h2>
      <p>books in your favorite genre <strong>{userFavorite}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookResult.data.allBooks.map(book => 
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Recommended