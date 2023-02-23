import { postComment } from '../requests/blogRequests'
import { useField } from '../hooks'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../StateContext'

const Comments = ({ blogId, comments }) => {
  const { resetValue: resetComment, ...newComment } = useField('text')
  const queryClient = useQueryClient()
  const commentMutation = useMutation(postComment)
  const setNotification = useNotificationDispatch()

  const handleComment = async (event) => {
    event.preventDefault()
    commentMutation.mutate(
      { blogId, comment: newComment.value },
      {
        onSuccess: (updatedBlog) => {
          const blogs = queryClient.getQueryData('blogs')
          const newBlogs = blogs.map((blog) =>
            blog.id === updatedBlog.id
              ? { ...blog, comments: updatedBlog.comments }
              : blog
          )
          queryClient.setQueryData('blogs', newBlogs)
          resetComment()
        },
        onError: () => {
          setNotification({
            type: 'SET_NOTIFICATION',
            payload: 'error has occurred'
          })
        }
      }
    )
  }
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Post an anonymous comment</span>
        </label>
        <form onSubmit={handleComment} className="input-group">
          <input {...newComment} className="borderedInput"/>
          <button className="btn" type="submit">comment</button>
        </form>

      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>
                  {comment.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
