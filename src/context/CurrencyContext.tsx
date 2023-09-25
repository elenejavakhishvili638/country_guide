import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { Currency } from "../types/currency";
import { CountriesContext } from "./CountriesContext";
import { CountryInfo } from "../types/country";
import { useParams } from "react-router";

type CurrencyContextType = {
    exchangeCountry?: CountryInfo,
    handleCountry: (code: string) => void,
    calcualteExchange: (num: string) => void,
    calculatedValue: string
}

const CurrencyContext = createContext<CurrencyContextType>({
    exchangeCountry: {
        altSpellings: [],
        area: 0,
        capital: [],
        capitalInfo: {
            latlng: [0, 0]
        },
        car: {
            signs: [],
            side: ""
        },
        cca2: "",
        cca3: "",
        ccn3: "",
        coatOfArms: {
            png: "",
            svg: ""
        },
        continents: [],
        currencies: {},
        demonyms: {},
        flag: "",
        flags: {
            png: "",
            svg: "",
            alt: undefined
        },
        idd: {
            root: "",
            suffixes: []
        },
        independent: false,
        landlocked: false,
        languages: {},
        latlng: [0, 0],
        maps: {
            googleMaps: "",
            openStreetMaps: ""
        },
        name: {
            common: "",
            nativeName: {},
            official: ""
        },
        population: 0,
        region: "",
        startOfWeek: "",
        status: "",
        subregion: "",
        timezones: [],
        tld: [],
        translations: {},
        unMember: false
    },
    handleCountry: () => { },
    calcualteExchange: () => { },
    calculatedValue: ""
})

interface CurrencyProviderProps {
    children: React.ReactNode;
}

const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
    const [exchangeCountry, setExchangeCountry] = useState<CountryInfo>()
    const { countries } = useContext(CountriesContext)
    const { countryCode } = useParams()
    const [savedCurrency, setSavedCurrency] = useState<{ [key: string]: Currency }>({})
    const [calculatedValue, setCalculatedValue] = useState<string>("0.00")

    const findCountryByCode = useCallback((code: string) => {
        return countries.find(country => country.cca3 === code);
    }, [countries]);

    const handleCountry = (code: string) => {
        const country = findCountryByCode(code);
        if (country) {
            setExchangeCountry(country)
        }
    }
    useEffect(() => {
        if (!countryCode || exchangeCountry) return
        const country = findCountryByCode(countryCode);
        setExchangeCountry(country)
    }, [countries, countryCode, exchangeCountry, findCountryByCode])

    useEffect(() => {
        if (!countryCode) return
        const country = findCountryByCode(countryCode);
        const countryCurrency = country && Object.keys(country.currencies).map((currency) => currency)

        if (!countryCurrency || savedCurrency[countryCurrency[0]]) {
            return
        }

        const fetchCountries = async () => {
            try {
                const response = await fetch(`https://api.exchangerate.host/latest?base=${countryCurrency[0]}`);
                const data = await response.json();
                setSavedCurrency(prevAirports => ({ ...prevAirports, [countryCurrency[0]]: data }));
            } catch (err) {
                console.log(err)
            }
        };

        fetchCountries();
    }, [countries, countryCode, findCountryByCode, savedCurrency])

    const calcualteExchange = (num: string) => {
        const exchangeCountryCountryCurrency = exchangeCountry && Object.keys(exchangeCountry.currencies).map((currency) => currency)
        if (!countryCode) return
        const country = findCountryByCode(countryCode);
        const countryCurrency = country && Object.keys(country.currencies).map((currency) => currency)
        if (!exchangeCountryCountryCurrency || !savedCurrency || !countryCurrency) return;
        const n = Number(num)
        const calc = (n * savedCurrency[countryCurrency[0]]?.rates[exchangeCountryCountryCurrency[0]]).toFixed(2)
        setCalculatedValue(calc)
    }

    return (
        <CurrencyContext.Provider
            value={{ calculatedValue, calcualteExchange, exchangeCountry, handleCountry }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export { CurrencyContext, CurrencyProvider };