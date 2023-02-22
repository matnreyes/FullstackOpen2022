import axios from 'axios'

export const sendUser = ({ url, user }) =>
  axios.post(url, user).then((res) => res.data)

export const fetchUsers = () => axios.get('/api/users').then((res) => res.data)
