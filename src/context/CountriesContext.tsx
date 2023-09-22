import { createContext, useEffect, useState } from "react";
import { CountryInfo } from "../types/country";

type CountriesContextType = {
    countries: CountryInfo[];
    loading: boolean;
};

const CountriesContext = createContext<CountriesContextType>({
    countries: [],
    loading: false,
});

interface CountriesProviderProps {
    children: React.ReactNode;
}

const CountiresProvider = ({ children }: CountriesProviderProps) => {
    const [countries, setCountries] = useState<CountryInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        };

        fetchCountries();
    }, [])
    return (
        <CountriesContext.Provider
            value={{ countries, loading }}
        >
            {children}
        </CountriesContext.Provider>
    );
};

export { CountriesContext, CountiresProvider };
