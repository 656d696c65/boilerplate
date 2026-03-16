import type { HTTPMethod } from "@boilerplate/metadata/utilities"
import type { IncomingHttpHeaders } from "http"

type RequestCache =
    | 'default'
    | 'force-cache'
    | 'no-cache'
    | 'no-store'
    | 'only-if-cached'
    | 'reload'

type RequestCredentials = 'omit' | 'include' | 'same-origin'
type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin'


export function routeRequest(parameters: {
    locale: string | undefined
    cache: RequestCache
    credentials: RequestCredentials
    headers: IncomingHttpHeaders
    method: HTTPMethod | string
    mode: RequestMode
    url: URL
    keepAlive: boolean
    signal: AbortSignal
    body: Record<string, unknown> | undefined
}) {
    return ({
        locale: parameters.locale,
        cache: parameters.cache,
        credentials: parameters.credentials,
        headers: parameters.headers,
        method: parameters.method,
        mode: parameters.mode,
        url: parameters.url,
        keepAlive: parameters.keepAlive,
        signal: parameters.signal,
        body: parameters.body,
    })
}
