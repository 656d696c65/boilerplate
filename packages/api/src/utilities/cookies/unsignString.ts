import { timingSafeEqual } from "crypto"
import { Exception } from "../exception.js"
import { signString } from "./signString.js"


export function unsignString(parameters: {
    signedValue: string | undefined
    secret: string
}) {
    try {
        if (parameters.signedValue === undefined) {
            throw new Exception({
                cause: "signedValue is undefined",
            })
        }

        const i = parameters.signedValue.lastIndexOf(".")
        if (i === -1) {
            throw new Exception({
                cause: "signedValue is not really signed",
            })
        }
        const value = parameters.signedValue.slice(0, i)
        const expectedSignedValue = signString({
            value: value,
            secret: parameters.secret,
        })

        const isSame = timingSafeEqual(
            Buffer.from(parameters.signedValue),
            Buffer.from(expectedSignedValue)
        )
        if (isSame === false) {
            throw new Exception({
                cause: "Wrong signedValue",
            })
        }

        return value
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Failed to unsign string",
            rawError: error,
        })
    }
}
