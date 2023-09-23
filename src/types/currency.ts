export type Currency = {
    motd: {
        msg: string,
        url: string
    },
    success: boolean,
    date: string,
    rates: {
        [key: string]: number
    }
}