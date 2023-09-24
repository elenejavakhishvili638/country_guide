import "./Airports.css"
import { useContext, useEffect, useState } from "react"
import { AirportsContext } from "../context/AirportsContext"
import { useParams } from "react-router"
import debounce from "lodash/debounce"
import Loading from "../components/shared/Loading"

const Airports = () => {
    const { savedAirports, loading, fetchAirports } = useContext(AirportsContext)
    const { countryCode } = useParams()
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
        if (countryCode && !savedAirports[countryCode]) {
            fetchAirports(countryCode, "");
        }
    }, [countryCode, fetchAirports, savedAirports])

    const debouncedFetchAirports = debounce((countryCode: string, value: string) => fetchAirports(countryCode, value), 500)

    if (!countryCode) {
        return;
    }

    const airports = savedAirports[countryCode] || [];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)
        debouncedFetchAirports(countryCode, value)
    }

    const filteredAirports = airports.filter((airport) => airport.iata !== "")
    const halfLength = Math.ceil(filteredAirports.length / 2);

    const firstHalf = filteredAirports.slice(0, halfLength);
    const secondHalf = filteredAirports.slice(halfLength);


    return (
        <div className="airports-container">
            <h4>Airports</h4>
            <form>
                <input value={searchValue} onChange={handleChange} type="text" placeholder="Search for airport" />
            </form>
            {loading ? (<Loading />) : filteredAirports.length === 0 ? <p style={{ color: "rgb(211, 47, 47)" }}>There are no airports found 😟</p> :
                (
                    <div className="column-wrapper">
                        <div className="airports-column">
                            {firstHalf.map((airport) => {
                                if (airport.iata) {
                                    return (
                                        <p key={airport.name}>
                                            {airport.iata} - {airport.name} ({airport.city})
                                        </p>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="airports-column">
                            {secondHalf.map((airport) => {
                                if (airport.iata) {
                                    return (
                                        <p key={airport.name}>
                                            {airport.iata} - {airport.name} ({airport.city})
                                        </p>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Airports