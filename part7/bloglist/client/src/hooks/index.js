import { useState, useEffect } from 'react'
import { useUserDispatch, useUserValue } from '../NotificationContext'
import { setToken } from '../requests/blogRequests'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useToggle = (intitialState = false) => {
  const [state, setState] = useState(intitialState)

  const toggle = () => setState(state => !state)

  return [state, toggle]
}

export const useLogin = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()

  const login = (userInfo) => {
    window.localStorage.setItem('user', JSON.stringify(userInfo))
    setToken(userInfo.token)
    dispatch({ type: 'SET_USER', payload: userInfo })
  }

  useEffect(() => {
    const loggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (loggedIn) {
      setToken(loggedIn.token)
      dispatch({ type: 'SET_USER', payload: loggedIn })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    dispatch({ type: 'RESET' })
  }

  return {
    user,
    login,
    logout
  }
}