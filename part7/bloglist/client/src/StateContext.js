import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'RESET':
    return null
  default:
    return state
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  case 'RESET':
    return ''
  default:
    return state
  }
}

const StateContext = createContext()

export const StateContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )
  const [user, userDispatch] = useReducer(userReducer, { username: null })

  const combinedReducers = {
    notification: [notification, notificationDispatch],
    user: [user, userDispatch]
  }

  return (
    <StateContext.Provider value={combinedReducers}>
      {props.children}
    </StateContext.Provider>
  )
}

export const useNotificationValue = () => {
  const { notification } = useContext(StateContext)
  return notification[0]
}

export const useNotificationDispatch = () => {
  const { notification } = useContext(StateContext)
  return notification[1]
}

export const useUserValue = () => {
  const { user } = useContext(StateContext)
  return user[0]
}

export const useUserDispatch = () => {
  const { user } = useContext(StateContext)
  return user[1]
}

export default StateContext
