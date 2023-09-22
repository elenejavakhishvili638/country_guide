import "./Airports.css"
import { useContext } from "react"
import { AirportsContext } from "../context/AirportsContext"

const Airports = () => {
    const { airports, loading } = useContext(AirportsContext)

    return (
        <div className="airports-container">
            <h4>Airports</h4>
            <form>
                <input type="text" placeholder="Search for airport" />
            </form>
            {
                loading ? <p>loading</p> : (
                    airports.map((airport) => {
                        if (airport.iata) {
                            return (
                                <p key={airport.city}>{airport.iata} - {airport.name} ({airport.city})</p>
                            )
                        }
                    })
                )
            }
        </div>
    )
}

export default Airports