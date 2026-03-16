import { models } from "@boilerplate/metadata/orm"
import { readUserRouteDefinition } from "@boilerplate/metadata/routes"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"


export const readUserRoute = routeHandler({
    definition: readUserRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })

        const readUser = await selectOne({
            database: Clients.platformPostgresql,
            table: models.user,
            where: (table) => eq(table.id, userSession.idUser)
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: readUser.id,
                isActive: readUser.isActive,
                email: readUser.email,
                createdAt: readUser.createdAt,
            },
        })
    }
})