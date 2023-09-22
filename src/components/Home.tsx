import { useState, useContext } from "react";
import Dropdown from "./shared/Dropdown";
import "./Home.css"
import { NavLink } from "react-router-dom";
import { CountriesContext } from "../context/CountriesContext";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Choose the country');
    const { countries, loading } = useContext(CountriesContext)

    const handleOptionClick = (country: string) => {
        setSelectedValue(country);
        setIsOpen(false);
    };
    return (
        <div className="home-container">
            <Dropdown countries={countries} loading={loading} isOpen={isOpen} selectedValue={selectedValue} setIsOpen={setIsOpen} handleOptionClick={handleOptionClick} />
            <div className="country-container">
            </div>
            <div className="page-wrapper">
                <NavLink
                    to="/:countryCode"
                    end={true}
                    className={({ isActive }) =>
                        isActive
                            ? "link active-link"
                            : "link"
                    }
                >
                    currency exchange
                </NavLink>
                <NavLink
                    to="/:countryCode/airports"
                    className={({ isActive }) =>
                        isActive
                            ? "link active-link"
                            : "link"
                    }
                >
                    airports
                </NavLink>
            </div>
        </div>
    )
}

export default Home