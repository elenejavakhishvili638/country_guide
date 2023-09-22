import React from 'react'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import "./Dropdown.css"

type Props = {
    isOpen: boolean,
    selectedValue: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOptionClick: (country: string) => void
}

const Dropdown = (props: Props) => {
    const { selectedValue, setIsOpen, isOpen, handleOptionClick } = props
    const countries = [
        'USA',
        'Canada',
        'UK',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',
        'Australia',

    ];
    return (
        <div className='dropdown-container'>
            <div className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
                <p style={{ color: selectedValue === "Choose the country" ? "rgb(204, 204, 204)" : "black" }}>
                    {selectedValue}
                </p>
                {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>

            {isOpen && (
                <ul>
                    {countries.map((country) => (
                        <li
                            key={country}
                            onClick={() => handleOptionClick(country)}

                        >
                            {country}
                        </li>
                    ))}
                </ul>


            )}
        </div>
    );
}

export default Dropdown