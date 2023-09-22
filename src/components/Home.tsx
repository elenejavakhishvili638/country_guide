import { useState, useContext } from "react";
import Dropdown from "./shared/Dropdown";
import "./Home.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CountriesContext } from "../context/CountriesContext";
import Country from "./Country"

const Home = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { countries, loading } = useContext(CountriesContext)
    const navigate = useNavigate();
    const { countryCode } = useParams()

    const handleOptionClick = (code: string) => {
        navigate(`/${code}`);
        setIsOpen(false);
    };

    return (
        <div className="home-container">
            <Dropdown countries={countries} loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} handleOptionClick={handleOptionClick} />
            <div className="country-container">
                {countryCode ? (
                    <Country />
                ) : null}
            </div>
            <div className="page-wrapper">
                <NavLink
                    to={`/${countryCode}`}
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
                    to={`/${countryCode}/airports`}
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