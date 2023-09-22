import React from 'react'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import "./Dropdown.css"
import { CountryInfo } from '../../types/country'

type Props = {
    isOpen: boolean,
    selectedValue: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOptionClick: (country: string) => void,
    countries: CountryInfo[],
    loading: boolean
}

const Dropdown = (props: Props) => {
    const { selectedValue, setIsOpen, isOpen, handleOptionClick, countries, loading } = props

    return (
        <div className='dropdown-container'>
            <div className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
                <p style={{ color: selectedValue === "Choose the country" ? "rgb(204, 204, 204)" : "black" }}>
                    {selectedValue}
                </p>
                {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>

            {isOpen && !loading && (
                <ul>
                    {countries.map((country) => (
                        <li
                            key={country.cca3}
                            onClick={() => handleOptionClick(country.name.common)}

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