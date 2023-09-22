import { useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { CountriesContext } from '../context/CountriesContext'
import { CountryInfo } from '../types/country'
import "./Country.css"

const Country = () => {
    const { countries, loading } = useContext(CountriesContext)
    const { countryCode } = useParams()
    const [country, setCountry] = useState<CountryInfo>()

    useEffect(() => {
        const foundCountry = countries.find((country) => country.cca3 === countryCode)
        setCountry(foundCountry)

    }, [countries, countryCode])

    const borderNames = country?.borders?.map(border => {
        const borderCountry = countries.find((country) => country.cca3 === border);
        return borderCountry?.name.common;
    }).join(", ")

    return (
        <>
            {loading && <p>loading</p>}
            {
                country && (
                    <div className='country-wrapper'>
                        <h4 className='country-name'>{country.name.official} <img src={country.flags.svg} alt={country.flags.alt ? country.flags.alt : country.name.common} /></h4>
                        <div className='country-info-wrapper'>
                            <div className='country-info-first-section'>
                                <div>
                                    <p>capital:</p>
                                    {country.capital.map(cap => <span>{cap}</span>)}
                                </div>
                                <div>
                                    <p>continent:</p>
                                    {country.continents.map(cont => <span>{cont}</span>)}
                                </div>
                                <div>
                                    <p>currency:</p>
                                    {Object.values(country.currencies).map((currency, index) => (
                                        <span key={index}>
                                            {currency.name} ({currency.symbol})
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='country-info-second-section'>
                                <div>
                                    <p>population:</p>
                                    <span>
                                        {country.population}
                                    </span>
                                </div>
                                <div>
                                    <p>region:</p>
                                    <span>
                                        {country.region}, {country.subregion}
                                    </span>
                                </div>
                                <div className='borders'>
                                    <p>borders:</p>
                                    <span>
                                        {borderNames}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Country