import { models } from "@boilerplate/metadata/orm"
import { deleteUserRouteDefinition } from "@boilerplate/metadata/routes"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { authCookieMaxAge, cookiePrefix } from "../../../utilities/constants.js"
import { serializeCookie } from "../../../utilities/cookies/serializeCookie.js"
import { Environment } from "../../../utilities/environment.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { update } from "../../../utilities/sql/updateOne.js"


export const deleteUserRoute = routeHandler({
    definition: deleteUserRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })

        await Clients.platformPostgresql.transaction(async (transaction) => {
            await update({
                database: transaction,
                table: models.user,
                data: {
                    isArchived: true,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    and(
                        eq(table.id, userSession.idUser)
                    )
                )
            })

            await update({
                database: transaction,
                table: models.userSession,
                data: {
                    isActive: false,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    and(
                        eq(table.id, userSession.idUser)
                    )
                )
            })
        })

        // Set cookies
        context.response.setHeader(
            "Set-Cookie",
            serializeCookie({
                name: `${cookiePrefix}_${"user_session_token"}`,
                value: "",
                options: {
                    maxAge: authCookieMaxAge,
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    domain: Environment.COOKIES_DOMAIN,
                    path: "/",
                }
            })
        )
        context.response.setHeader(
            "Set-Cookie",
            serializeCookie({
                name: `${cookiePrefix}_${"authenticated"}`,
                value: String(false),
                options: {
                    maxAge: authCookieMaxAge,
                    httpOnly: false,
                    secure: true,
                    sameSite: "None",
                    domain: Environment.COOKIES_DOMAIN,
                    path: "/",
                }
            })
        )

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})