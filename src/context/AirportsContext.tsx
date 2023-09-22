import { createContext, useEffect, useState, useContext } from "react";
import { AirportInfo } from "../types/airport";
import { useParams } from "react-router";
import { CountriesContext } from "./CountriesContext";

type AirportsContextType = {
    airports: AirportInfo[];
    loading: boolean;
};

const AirportsContext = createContext<AirportsContextType>({
    airports: [],
    loading: false,
});

interface AirportsProviderProps {
    children: React.ReactNode;
}

const AirportsProvider = ({ children }: AirportsProviderProps) => {
    const [airports, setAirports] = useState<AirportInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { countries } = useContext(CountriesContext)
    const { countryCode } = useParams()


    useEffect(() => {
        const foundCountry = countries.find((country) => country.cca3 === countryCode)
        const fetchAirports = async () => {
            setLoading(true);
            try {
                if (foundCountry) {
                    const response = await fetch(`https://api.api-ninjas.com/v1/airports?country=${foundCountry?.cca2}&name=`, {
                        headers: {
                            'X-Api-Key': import.meta.env.VITE_AIRPORTS_API_KEY,
                        }
                    });
                    const data = await response.json();
                    setAirports(data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err)
            }
        };

        fetchAirports();
    }, [countries, countryCode])
    return (
        <AirportsContext.Provider
            value={{ airports, loading }}
        >
            {children}
        </AirportsContext.Provider>
    );
};

export { AirportsContext, AirportsProvider };
