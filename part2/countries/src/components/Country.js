const Country = ({ country }) => (
    <>
        <h2>{country.name.common}</h2>
        <img src={country.flags.png} alt={`${country.name.common}'s flag`}></img>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
        </ul>
    </>
)

export default Country