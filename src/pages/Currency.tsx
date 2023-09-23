import "./Currency.css"
import { CountriesContext } from "../context/CountriesContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import Dropdown from "../components/shared/Dropdown"
import { CurrencyContext } from "../context/CurrencyContext"


const Currency = () => {
    const { countries } = useContext(CountriesContext)
    const { calculatedValue, exchangeCountry, handleCountry, calcualteExchange } = useContext(CurrencyContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { countryCode } = useParams()
    const [exchangeMoneySymbol, setExchangeMoneySymbol] = useState<string>("")
    const [value, setValue] = useState<string>("")
    const [exchangeValue, setExchangeValue] = useState<string>("0")

    const handleOptionClick = (code: string) => {
        setIsOpen(false)
        handleCountry(code)
    }

    const country = countries.find((country) => country.cca3 === countryCode)
    const currency = country && Object.values(country.currencies).map((currency) => currency.symbol)

    useEffect(() => {
        const currency = exchangeCountry && Object.values(exchangeCountry.currencies).map((currency) => currency.symbol)
        if (currency) {
            setExchangeMoneySymbol(currency[0])
        }
        if (exchangeCountry) {
            setValue(exchangeCountry.name.common)
        }
    }, [exchangeCountry])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setExchangeValue(value)
        calcualteExchange(value)
    }

    useEffect(() => {
        calcualteExchange(exchangeValue)
    }, [calcualteExchange, exchangeValue])

    return (
        <div className="currency-container">
            <h4>Currency Exchanage</h4>
            <Dropdown parentDivClassName="currency-dropdown-container" childDivClassName="currency-dropdown-button" countryName={value} isOpen={isOpen} setIsOpen={setIsOpen} handleOptionClick={handleOptionClick} />
            <div className="currency-exchange-container">
                <div className="exchange-from">
                    <span>{currency && currency[0]}</span>
                    <input className="input" onChange={handleChange} value={exchangeValue} type="number" />
                </div>
                <h4>=</h4>
                <div className="exchange-to">
                    <p className="input">
                        {exchangeMoneySymbol ? exchangeMoneySymbol : currency && currency[0]} {calculatedValue}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Currency