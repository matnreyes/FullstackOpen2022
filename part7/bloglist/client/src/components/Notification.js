import PropTypes from 'prop-types'

const Notification = ({ notification, setNotification }) => {
  setTimeout(() => {
    setNotification(null)
  }, 5000)

  const notifStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    width: '50%'
  }

  notification.includes('error')
    ? (notifStyle.color = 'red')
    : (notifStyle.color = 'green')

  return (
    <div style={notifStyle}>
      <h2>{notification}</h2>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Notification
