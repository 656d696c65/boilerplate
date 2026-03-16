import { getCookie } from "./getCookie.js"
import { cookiePrefix } from "./variables.js"


export function getAuthenticated() {
    const isAuthenticatedRaw = getCookie(`${cookiePrefix}_${"authenticated"}`)

    if (isAuthenticatedRaw === "true") return true
    if (isAuthenticatedRaw === "false") return false

    return undefined
}