import { useNotificationDispatch, useNotificationValue } from '../StateContext'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()
  setTimeout(() => {
    dispatch({ type: 'RESET' })
  }, 5000)

  const notificationType = notification.includes('error')
    ? 'alert-error'
    : 'alert-success'

  return (
    <div className={`alert ${notificationType} shadow-lg`}>
      <h2>{notification}</h2>
    </div>
  )
}

export default Notification
