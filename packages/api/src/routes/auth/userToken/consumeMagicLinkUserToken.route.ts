import { userModel, userSessionModel, userTokenModel } from "@boilerplate/metadata/orm"
import { consumeMagicLinkUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { generateId } from "@boilerplate/metadata/utilities"
import { and, eq, gt } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { authCookieMaxAge, cookiePrefix } from "../../../utilities/constants.js"
import { serializeCookie } from "../../../utilities/cookies/serializeCookie.js"
import { signString } from "../../../utilities/cookies/signString.js"
import { Environment } from "../../../utilities/environment.js"
import { getRemoteAddress } from "../../../utilities/getRemoteAddress.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"


export const consumeMagicLinkUserTokenRoute = routeHandler({
    definition: consumeMagicLinkUserTokenRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: consumeMagicLinkUserTokenRouteDefinition.schemas.input
        })

        const readUserToken = await selectOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            where: (table) => (
                and(
                    eq(table.value, body.signInToken),
                    eq(table.type, "magic-link"),
                    eq(table.isConsumed, false),
                    gt(table.expiresAt, new Date().toISOString())
                )
            )
        })

        const readUser = await selectOne({
            database: Clients.platformPostgresql,
            table: userModel,
            where: (table) => (
                and(
                    eq(table.isArchived, false),
                    eq(table.id, readUserToken.idUser),
                )
            )
        })

        // Store the session
        const createUserSession = await insertOne({
            database: Clients.platformPostgresql,
            table: userSessionModel,
            data: {
                id: generateId(),
                idUser: readUser.id,
                isActive: true,
                token: generateId(),
                ip: getRemoteAddress({ context: context }),
                createdAt: new Date().toISOString(),
            }
        })

        // Set cookies
        context.response.setHeader(
            "Set-Cookie",
            [
                serializeCookie({
                    name: `${cookiePrefix}_${"user_session_token"}`,
                    value: signString({
                        value: createUserSession.id,
                        secret: Environment.COOKIES_KEY,
                    }),
                    options: {
                        maxAge: authCookieMaxAge,
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                        domain: Environment.COOKIES_DOMAIN,
                        path: "/",
                    }
                }),
                serializeCookie({
                    name: `${cookiePrefix}_${"authenticated"}`,
                    value: String(true),
                    options: {
                        maxAge: authCookieMaxAge,
                        httpOnly: false,
                        secure: true,
                        sameSite: "None",
                        domain: Environment.COOKIES_DOMAIN,
                        path: "/",
                    }
                })
            ]
        )

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})