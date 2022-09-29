import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [display, setDisplay] =useState([])

  // fetch countries
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const country = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplay(country)
  }

  const handleShow = (e) => {
    setDisplay(display.filter(c => c.ccn3 === e.target.value))
  }
  
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      {display.length > 10
      ? <p>Too many matches, please specify</p>
      : display.length !==1
        ? <ul>{display.map(country => {
                return (
                  <li key={country.ccn3}>
                    {country.name.common}<button value={country.ccn3} onClick={handleShow}>show</button>
                  </li>
                )
              })}
            </ul>
        : <Country country={display[0]} />}
    </div>
  )
}

export default App