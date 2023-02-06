const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": 
      console.log(action.payload)
      return action.payload
    case "RESET":
      return null
    default: 
      return state
  }
}

export default notificationReducer