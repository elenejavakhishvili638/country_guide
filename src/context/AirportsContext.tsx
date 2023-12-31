import { createContext, useState, useContext, useCallback } from "react";
import { AirportInfo } from "../types/airport";
import { CountriesContext } from "./CountriesContext";

type AirportsContextType = {
    savedAirports: { [key: string]: AirportInfo[] };
    loading: boolean;
    fetchAirports: (countryCode: string, name: string) => Promise<void>
};

const AirportsContext = createContext<AirportsContextType>({
    savedAirports: {},
    loading: false,
    fetchAirports: async () => { },
});

interface AirportsProviderProps {
    children: React.ReactNode;
}

const AirportsProvider = ({ children }: AirportsProviderProps) => {
    const [savedAirports, setSavedAirports] = useState<{ [key: string]: AirportInfo[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { countries } = useContext(CountriesContext)

    const fetchAirports = useCallback(async (countryCode: string, name?: string) => {
        setLoading(true);
        const foundCountry = countries.find((country) => country.cca3 === countryCode)
        try {
            if (foundCountry) {
                const response = await fetch(`https://api.api-ninjas.com/v1/airports?country=${foundCountry?.cca2}&name=${name}`, {
                    headers: {
                        'X-Api-Key': import.meta.env.VITE_AIRPORTS_API_KEY,
                    }
                });
                const data = await response.json();
                setSavedAirports(prevAirports => ({ ...prevAirports, [countryCode]: data }));
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
        }
    }, [countries]);


    return (
        <AirportsContext.Provider
            value={{ savedAirports, loading, fetchAirports }}
        >
            {children}
        </AirportsContext.Provider>
    );
};

export { AirportsContext, AirportsProvider };