import "./Currency.css"
import { CountriesContext } from "../context/CountriesContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"


const Currency = () => {
    const { countries, loading } = useContext(CountriesContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { countryCode } = useParams()
    const [exchangeCountryCode, setExchangeCountryCode] = useState<string>("")
    const [exchangeMoneySymbol, setExchangeMoneySymbol] = useState<string>("")
    const [value, setValue] = useState<string>("")

    const handleOptionClick = (code: string) => {
        setIsOpen(false)
        setExchangeCountryCode(code)
    }

    const country = countries.find((country) => country.cca3 === countryCode)
    const currency = country && Object.values(country.currencies).map((currency) => currency.symbol)

    useEffect(() => {
        const country = countries.find((country) => country.cca3 === exchangeCountryCode)
        const currency = country && Object.values(country.currencies).map((currency) => currency.symbol)
        if (currency) {
            setExchangeMoneySymbol(currency[0])
        }
        if (country) {
            setValue(country.name.common)
        }
    }, [countries, exchangeCountryCode])

    return (
        <div className="currency-container">
            <h4>Currency Exchanage</h4>
            <div className='currency-dropdown-container'>
                <div className='currency-dropdown-button' onClick={() => setIsOpen(!isOpen)}>
                    <p style={{ color: "black" }}>
                        {value ? value : country?.name.common}
                    </p>
                    {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                </div>
                {isOpen && !loading && (
                    <ul>
                        {countries.map((country) => (
                            <li
                                key={country.cca3}
                                onClick={() => handleOptionClick(country.cca3)}

                            >
                                {country.name.common}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="currency-exchange-container">
                <div className="exchange-from">
                    <input type="number" placeholder={currency && currency[0]} />
                </div>
                <h4>=</h4>
                <div className="exchange-to">
                    <input type="number" placeholder={exchangeMoneySymbol ? exchangeMoneySymbol : currency && currency[0]} />
                </div>
            </div>
        </div>
    )
}

export default Currency