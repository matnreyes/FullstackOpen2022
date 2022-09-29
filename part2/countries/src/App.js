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
      setSearch(e.target.value.toLowerCase())
      const country = countries.filter(c => c.name.common.toLowerCase().includes(search))
      setDisplay(country)
  }
  
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      {display.length > 10
      ? <p>Too many matches, please specify</p>
      : display.length !==1
        ? <ul>{display.map(country => <li key={country.ccn3}>{country.name.common}</li>)}</ul>
        : <Country country={display[0]} />}
    </div>
  )
}

export default App