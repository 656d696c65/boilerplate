import { userModel } from "@boilerplate/metadata/orm"
import { updateUserRouteDefinition } from "@boilerplate/metadata/routes"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { update } from "../../../utilities/sql/updateOne.js"


export const updateUserRoute = routeHandler({
    definition: updateUserRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })
        const body = await validateBodyMiddleware({
            context: context,
            schema: updateUserRouteDefinition.schemas.input
        })

        await update({
            database: Clients.platformPostgresql,
            table: userModel,
            data: {
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) => (
                and(
                    eq(table.id, userSession.idUser)
                )
            )
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})