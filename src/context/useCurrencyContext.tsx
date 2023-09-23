import { useContext, } from "react";
import { CurrencyContext } from "./CurrencyContext";

export const useCurrencyContext = () => {
    return useContext(CurrencyContext);
};