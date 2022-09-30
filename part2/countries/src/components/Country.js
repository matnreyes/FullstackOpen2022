import { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(false)
    
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const api_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital[0]}, ${country.name.common}`
        axios
            .get(api_url)
            .then(response => setWeather(response.data))
    }, [country])

    return (
        <>
            <h2>{country.name.common}</h2>
            <img src={country.flags.png} alt={`${country.name.common}'s flag`}></img>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
            </ul>
            <h3>Weather in {country.capital[0]}</h3>
            {weather && <Weather currentTemp={weather.current.temperature} weatherURL={weather.current.weather_icons[0]} weatherDesc={weather.current.weather_descriptions[0]} wind={weather.current.wind_speed}/>}
        </>    
    )
}

export default Country