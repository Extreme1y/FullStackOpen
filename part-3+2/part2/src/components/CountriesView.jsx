const CountryView = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>

            <p>capital {country.capital}</p>
            <p>area {country.area}</p>


            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>

            <img src={country.flags.png} style={{marginTop: '10px'}} alt={'flag'}/>

        </div>
    )
}

const CountriesView = ({countries}) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        {country.name.common}
                    </li>
                ))}
            </ul>
        )
    } else if (countries.length === 1) {
        return (
            <CountryView country={countries[0]}/>
        )
    }

}

export default CountriesView