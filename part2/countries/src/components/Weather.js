const Weather = ({ currentTemp, weatherURL, weatherDesc, wind }) => {
    return (
        <>
            <p>temperature {currentTemp}°C</p>
            <img src={weatherURL} alt={weatherDesc}></img>
            <p>wind: {wind}kph</p>
        </>
    )
}

export default Weather