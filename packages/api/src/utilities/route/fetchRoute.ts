import * as v from "valibot"
import type { BaseContext } from "../api/baseContext.js"
import type { routeHandler } from "../api/routeHandler.js"
import { matchPath } from "./matchPath.js"
import { routeResponse } from "./routeResponse.js"



export function fetchRoute(parameters: {
    context: BaseContext
    routes: Array<ReturnType<typeof routeHandler>>
}): ReturnType<typeof routeResponse> | Promise<ReturnType<typeof routeResponse>> {
    const route = parameters.routes.find(
        (route) => {
            const isRightMethod = route.definition.methods.some((method) => method === parameters.context.request.method)
            const isRightUrl = matchPath(route.definition.path, parameters.context.request.url.pathname)
            return isRightMethod && isRightUrl
        }
    )
    if (route === undefined) {
        return routeResponse({
            context: parameters.context,
            statusCode: 404,
            bodySchema: v.string(),
            bodyValue: "Not found",
        })
    }

    return route.handler({
        context: parameters.context
    })
}