import { useContext, } from "react";
import { AirportsContext } from "./AirportsContext";

export const useAirportsContext = () => {
    return useContext(AirportsContext);
};