import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const getResponse = axios.get(baseURL)
    return getResponse.then(response => response.data)
}

const create = newObject => {
    const postResponse = axios.post(`${baseURL}`, newObject)
    return postResponse.then(response => response.data)
}

const delPerson = id => {
    const deleteResponse = axios.delete(`${baseURL}/${id}`)
    return deleteResponse.then(response => response.data)
}

const personService = { getAll, create, delPerson}

export default personService