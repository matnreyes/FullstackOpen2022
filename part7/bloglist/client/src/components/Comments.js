import { postComment } from '../requests/blogRequests'
import { useField } from '../hooks'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../StateContext'

const Comments = ({ blogId, comments }) => {
  const newComment = useField('text')
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
        },
        onError: () => {
          setNotification({
            type: 'SET_NOTIFICATION',
            payload: 'error has occurred'
          })
        }
      }
    )
    newComment.value = ''
  }
  return (
    <div>
      <form onSubmit={handleComment}>
        <input {...newComment} />
        <button type="submit">comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
