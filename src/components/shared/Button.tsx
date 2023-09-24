import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router";


type Props = {
    countryCode: string | undefined
}

const Button = (props: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(0);
    const { countryCode } = props

    useEffect(() => {
        if (location.pathname.includes('airports')) {
            setValue(1)
        } else {
            setValue(0)
        }

    }, [location.pathname])


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate(`/${countryCode}`);
        } else {
            navigate(`/${countryCode}/airports`);
        }
    };

    return (
        <Tabs value={value} onChange={handleChange}>
            <Tab label="currency exchange" />
            <Tab label="airports" />
        </Tabs>
    );
}

export default Button