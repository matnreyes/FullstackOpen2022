import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(result => setResources(result.data))
  }, [baseUrl])

  const create = async (resource) => {
    const addedNote = await axios.post(baseUrl, resource)
    setResources(resources.concat(addedNote.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

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