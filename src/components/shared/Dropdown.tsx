import React, { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import "./Dropdown.css"
import { CountryInfo } from '../../types/country'
import { useParams } from 'react-router'

type Props = {
    isOpen: boolean,
    // selectedValue: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOptionClick: (code: string) => void,
    countries: CountryInfo[],
    loading: boolean
}

const Dropdown = (props: Props) => {
    const { countryCode } = useParams()
    const [value, setValue] = useState<string>()

    const { setIsOpen, isOpen, handleOptionClick, countries, loading } = props

    useEffect(() => {
        const foundCountry = countries.find((country) => country.cca3 === countryCode)
        setValue(foundCountry?.name.common)
    }, [countries, countryCode])

    return (
        <div className='dropdown-container'>
            <div className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
                <p style={{ color: !value ? "rgb(204, 204, 204)" : "black" }}>
                    {value ? value : "Choose the country"}
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
    );
}

export default Dropdown