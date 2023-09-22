import { useState } from "react";
import Dropdown from "./shared/Dropdown";
import "./Home.css"

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Choose the country');

    const handleOptionClick = (country: string) => {
        setSelectedValue(country);
        setIsOpen(false);
    };
    return (
        <div className="home-container">
            <Dropdown isOpen={isOpen} selectedValue={selectedValue} setIsOpen={setIsOpen} handleOptionClick={handleOptionClick} />
            <div className="country-container">
                <p>information about country</p>
            </div>
        </div>
    )
}

export default Home