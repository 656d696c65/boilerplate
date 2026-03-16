import { userSessionModel } from "@boilerplate/metadata/orm"
import { signOutRouteDefinition } from "@boilerplate/metadata/routes"
import { eq } from "drizzle-orm"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { authCookieMaxAge, cookiePrefix } from "../../../utilities/constants.js"
import { parseCookies } from "../../../utilities/cookies/parseCookies.js"
import { serializeCookie } from "../../../utilities/cookies/serializeCookie.js"
import { unsignString } from "../../../utilities/cookies/unsignString.js"
import { Environment } from "../../../utilities/environment.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { update } from "../../../utilities/sql/updateOne.js"


export const signOutRoute = routeHandler({
    definition: signOutRouteDefinition,
    handler: async ({ context }) => {
        const idUserSession = unsignString({
            signedValue: parseCookies({ value: context.request.headers.cookie })[`${cookiePrefix}_${"user_session_token"}`],
            secret: Environment.COOKIES_KEY,
        })

        await update({
            database: Clients.platformPostgresql,
            table: userSessionModel,
            data: {
                isActive: false,
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) => (
                eq(table.id, idUserSession)
            )
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