import { useState, useContext, useEffect, useRef } from "react";
import Dropdown from "./shared/Dropdown";
import "./Home.css"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CountriesContext } from "../context/CountriesContext";
import Country from "./Country"
import { Outlet } from "react-router-dom";
import Button from "./shared/Button";

const Home = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { countries } = useContext(CountriesContext)
    const navigate = useNavigate();
    const { countryCode } = useParams()
    const location = useLocation()
    const countriesRef = useRef(countries)

    const handleOptionClick = (code: string) => {
        navigate(`/${code}`);
        setIsOpen(false);
    };

    useEffect(() => {
        countriesRef.current = countries;
    }, [countries]);

    useEffect(() => {
        if (location.pathname !== '/') {
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_MAPS_API_KEY}`;

            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const result = data.results[0];
                        const countryComponent = result.address_components.find((component: { types: string | string[]; }) => component.types.includes('country'));
                        if (countryComponent) {
                            const foundCountry = countriesRef.current.find((country) => country.name.common === countryComponent.long_name)
                            if (foundCountry) {
                                navigate(`/${foundCountry?.cca3}`);
                            }
                        }
                    }
                });

        }, (error) => {
            console.error(error);
        });
    }, [location.pathname, navigate])

    return (
        <div className="home-container">
            <Dropdown parentDivClassName="dropdown-container" childDivClassName="dropdown-button" isOpen={isOpen} setIsOpen={setIsOpen} handleOptionClick={handleOptionClick} />
            <div className="country-container">
                {countryCode ? (
                    <Country />
                ) : null}
            </div>
            <div className="page-wrapper">
                <Button countryCode={countryCode} />
            </div>
            <Outlet />
        </div>
    )
}

export default Home