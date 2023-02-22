import { postBlog } from '../requests/blogRequests'
import { useNotificationDispatch } from '../StateContext'
import { useMutation, useQueryClient } from 'react-query'
import { useField } from '../hooks'

const BlogForm = () => {
  const { resetValue: resetTitle, ...title } = useField('text')
  const { resetValue: resetAuthor, ...author } = useField('text')
  const { resetValue: resetUrl, ...url } = useField('text')
  const setNotification = useNotificationDispatch()

  const newBlogMutation = useMutation(postBlog)
  const queryClient = useQueryClient()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogInput = {
      title: title.value,
      url: url.value,
      author: author.value,
      important: false
    }
    newBlogMutation.mutate(blogInput, {
      onSuccess: (newBlog) => {
        const blogs = queryClient.getQueryData('blogs')
        queryClient.setQueryData('blogs', blogs.concat(newBlog))
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: 'Blog succesfully added'
        })
        resetTitle()
        resetAuthor()
        resetUrl()
      },
      onError: (exception) => {
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: `error: ${exception.response.data.error}`
        })
      }
    })
  }

  const formStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2,
    padding: 8,
    width: 200
  }
  return (
    <div style={formStyle}>
      <h3>add blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <br />
          <input {...title} />
        </div>
        <div>
          author:
          <br />
          <input {...author} />
        </div>
        <div>
          url:
          <br />
          <input {...url} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm
