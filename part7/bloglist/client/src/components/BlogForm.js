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

  return (
    <div className="cardContainer">
      <div className="card-body">
        <span className="card-title">add blog</span>
        <form onSubmit={handleSubmit} className="formStyle">
          <div className="p-1">
            <label className="labeledInput">
              <span>Title:</span>
              <input
                className="borderedInput"
                placeholder="enter title"
                {...title}
              />
            </label>
          </div>
          <div className="p-1">
            <label className="labeledInput">
              <span>Author:</span>
              <input
                className="borderedInput"
                placeholder="enter author"
                {...author}
              />
            </label>
          </div>
          <div className="p-1">
            <label className="labeledInput">
              <span>Url:</span>
              <input
                className="borderedInput"
                placeholder="enter url"
                {...url}
              />
            </label>
          </div>
          <button className="btn btn-outline btn-info" type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm
