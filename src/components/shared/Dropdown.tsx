import React, { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import "./Dropdown.css"
import { useParams } from 'react-router'
import { useContext } from 'react'
import { CountriesContext } from '../../context/CountriesContext'

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOptionClick: (code: string) => void,
    countryName?: string,
    parentDivClassName: string,
    childDivClassName: string
}

const Dropdown = (props: Props) => {
    const { countryCode } = useParams()
    const [value, setValue] = useState<string>()
    const { countries, loading } = useContext(CountriesContext)


    const { setIsOpen, isOpen, handleOptionClick, countryName, parentDivClassName, childDivClassName } = props

    useEffect(() => {
        const foundCountry = countries.find((country) => country.cca3 === countryCode)
        setValue(foundCountry?.name.common)
    }, [countries, countryCode])

    return (
        <div className={parentDivClassName}>
            <div className={childDivClassName} onClick={() => setIsOpen(!isOpen)}>
                <p style={{ color: !value ? "rgb(204, 204, 204)" : "black" }}>
                    {countryName ? countryName : value ? value : "Choose the country"}
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