import { readUserSessionRouteDefinition } from "@boilerplate/metadata/routes"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const readUserSessionRoute = routeHandler({
    definition: readUserSessionRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: userSession,
        })
    }
})