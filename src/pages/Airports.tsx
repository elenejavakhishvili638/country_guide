import "./Airports.css"
import { useContext, useEffect } from "react"
import { AirportsContext } from "../context/AirportsContext"
import { useParams } from "react-router"

const Airports = () => {
    const { savedAirports, fetchAirports } = useContext(AirportsContext)
    const { countryCode } = useParams()
    useEffect(() => {
        if (countryCode && !savedAirports[countryCode]) {
            fetchAirports(countryCode);
        }
    }, [savedAirports, countryCode, fetchAirports])

    if (!countryCode) {
        return;
    }

    const airports = savedAirports[countryCode] || [];

    return (
        <div className="airports-container">
            <h4>Airports</h4>
            <form>
                <input type="text" placeholder="Search for airport" />
            </form>
            {
                !airports ? <p>There are no airports found 😟</p> : (
                    airports.map((airport) => {
                        if (airport.iata) {
                            return (
                                <p key={airport.name}>{airport.iata} - {airport.name} ({airport.city})</p>
                            )
                        }
                    })
                )
            }
        </div>
    )
}

export default Airports