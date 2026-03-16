export const currencyOptions: {
    [key in "EUR" | "USD" | "GBP"]: {
        code: string
        name: string
        symbol: string
    }
} = {
    "EUR": {
        name: "Euro",
        code: "EUR",
        symbol: "€",
    },
    "USD": {
        name: "US Dollar",
        code: "USD",
        symbol: "$",
    },
    "GBP": {
        name: "Pound Sterling",
        code: "GBP",
        symbol: "£",
    }
}