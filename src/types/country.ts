export type CountryInfo = {
    altSpellings: string[];
    area: number;
    borders?: string[];
    capital: string[];
    capitalInfo: {
        latlng: [number, number];
    };
    car: {
        signs: string[];
        side: string;
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    coatOfArms: {
        png: string;
        svg: string;
    };
    continents: string[];
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    demonyms: {
        [key: string]: {
            f: string;
            m: string;
        };
    };
    flag: string;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    independent: boolean;
    landlocked: boolean;
    languages: {
        [key: string]: string;
    };
    latlng: [number, number];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    name: {
        common: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
        official: string;
    };
    population: number;
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
    unMember: boolean;
};