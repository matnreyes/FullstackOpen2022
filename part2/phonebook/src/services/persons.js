import axios from 'axios'

const baseURL = '/api/contacts'

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

const update = newObject => {
    const updateResponse = axios.put(`${baseURL}/${newObject.id}`, newObject)
    return updateResponse.then(response => response.data)
}

const personService = { getAll, create, delPerson, update}

export default personService