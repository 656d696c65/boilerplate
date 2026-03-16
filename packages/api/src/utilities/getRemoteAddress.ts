import type { BaseContext } from "./api/baseContext.js"


export function getRemoteAddress(parameters: {
    context: BaseContext
}) {
    const forwardedHeader = parameters.context.request.headers["x-forwarded-for"]
    if (forwardedHeader !== undefined) {
        if (Array.isArray(forwardedHeader)) {
            return forwardedHeader?.at(0)?.trim()
        } else {
            return forwardedHeader?.split(",")?.at(0)?.trim()
        }
    }

    const hostHeader = parameters.context.request.headers.host
    if (hostHeader !== null) {
        return hostHeader
    }

    return null
}