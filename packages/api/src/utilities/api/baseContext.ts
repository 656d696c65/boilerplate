import type { ServerResponse } from "http"
import type { routeRequest } from "../route/routeRequest.js"


export interface BaseContext {
    request: ReturnType<typeof routeRequest>
    response: ServerResponse
}