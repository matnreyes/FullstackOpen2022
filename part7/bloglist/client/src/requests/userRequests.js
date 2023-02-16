import axios from 'axios'

export const sendUser = ({ url, user }) =>
  axios.post(url, user).then(res => res.data)