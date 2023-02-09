import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    if (name !== '') {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(result => {
          const countryData = {
            name: result.name.common,
            capital: result.capital[0],
            population: result.population,
            flag: result.flags.png
          }
          setCountry({data: countryData, found: true})
        })
        .catch(e => {
          setCountry({found: false})
        })
    }

  }, [name])

  return country
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