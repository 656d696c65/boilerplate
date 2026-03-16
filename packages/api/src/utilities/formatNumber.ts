

export function formatNumber(parameters: {
    number: number
    precision: number
}) {
    return Number(parameters.number.toFixed(parameters.precision))
}
