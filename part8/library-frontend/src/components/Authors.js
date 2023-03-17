import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS)

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { props.user && <AuthorEdit setError={props.setError} authors={authors}/> }
    </div>
  )
}

const AuthorEdit = ({ setError, authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = (event) => {
    event.preventDefault()
    
    if (name === '') {
      setError('No author selected')
    }

    editAuthor({ variables: { name, setBornTo: Number(born.length > 0 ? born : undefined) },
      onError: (error) => {
        setError(error.message)
      }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option disabled={true} value=''>-- Select an author --</option>
            {authors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born: <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}

export default Authors
