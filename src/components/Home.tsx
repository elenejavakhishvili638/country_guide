import { useState, useContext, useEffect } from "react";
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

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_MAPS_API_KEY}`;

            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const result = data.results[0];
                        const countryComponent = result.address_components.find((component: { types: string | string[]; }) => component.types.includes('country'));
                        if (countryComponent) {
                            const foundCountry = countries.find((country) => country.name.common === countryComponent.long_name)
                            if (foundCountry) {
                                navigate(`/${foundCountry?.cca3}`);
                            }
                        }
                    }
                });

        }, (error) => {
            console.error(error);
        });
    }, [countries, navigate])



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