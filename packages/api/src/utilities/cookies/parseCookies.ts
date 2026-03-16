import { Exception } from "../exception.js"


export function parseCookies(parameters: {
    value: string | null | undefined
}) {
    try {
        if (parameters.value === undefined) {
            throw new Exception({
                cause: "value is undefined",
            })
        }
        if (parameters.value === null) {
            throw new Exception({
                cause: "value is null",
            })
        }

        return Object.fromEntries(
            parameters.value
                .split(";")
                .map(cookie => {
                    const [key, ...val] = cookie.trim().split("=")
                    return [key, decodeURIComponent(val.join("="))]
                })
        )
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error while parsing cookies",
            rawError: error,
        })
    }
}