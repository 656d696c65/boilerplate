import type { StatusCode } from "./route/statusCode.js"


export class Exception {
    internalMessage: string
    externalMessage: string
    statusCode: StatusCode
    cause: string
    stack?: string

    constructor(props: {
        internalMessage?: string
        externalMessage?: string
        statusCode?: StatusCode
        cause?: string
        rawError?: unknown
    }) {
        this.internalMessage = (props.internalMessage !== undefined)
            ? props.internalMessage
            : (props.rawError instanceof Exception)
                ? props.rawError.internalMessage
                : (props.rawError instanceof Error)
                    ? props.rawError.message
                    : "Unknown error"

        this.externalMessage = (props.externalMessage !== undefined)
            ? props.externalMessage
            : (props.rawError instanceof Exception)
                ? props.rawError.externalMessage
                : "Internal error"

        this.statusCode = (props.statusCode !== undefined)
            ? props.statusCode
            : (props.rawError instanceof Exception)
                ? props.rawError.statusCode
                : 500

        this.cause = (props.cause !== undefined)
            ? props.cause
            : (props.rawError instanceof Exception)
                ? props.rawError.cause
                : (props.rawError instanceof Error)
                    ? String(props.rawError.cause)
                    : String(props.rawError)

        this.stack = (props.rawError instanceof Exception)
            ? props.rawError.cause
            : (props.rawError instanceof Error)
                ? props.rawError.stack
                : (new Error()).stack

        if (!(props.rawError instanceof Exception)) {
            console.error(this)
        }
    }
}