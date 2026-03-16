import { statusRouteDefinition } from "@boilerplate/metadata/routes"
import { routeHandler } from "../../utilities/api/routeHandler.js"
import { routeResponse } from "../../utilities/route/routeResponse.js"


export const statusRoute = routeHandler({
    definition: statusRouteDefinition,
    handler: async ({ context }) => {
        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                lastUpdatedAt: new Date().toISOString(),
                status: true,
            },
        })
    }
})