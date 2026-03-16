import { models } from "@boilerplate/metadata/orm"
import { eq } from "drizzle-orm"
import type { BaseContext } from "../utilities/api/baseContext.js"
import { Clients } from "../utilities/clients.js"
import { authCookieMaxAge, cookiePrefix } from "../utilities/constants.js"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { serializeCookie } from "../utilities/cookies/serializeCookie.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Environment } from "../utilities/environment.js"
import { Exception } from "../utilities/exception.js"
import { selectOne } from "../utilities/sql/selectOne.js"


export async function checkUserSessionMiddleware(parameters: {
    context: BaseContext
}) {
    try {
        const cookies = parseCookies({ value: parameters.context.request.headers.cookie })
        const userSessionToken = unsignString({
            signedValue: cookies[`${cookiePrefix}_${"user_session_token"}`],
            secret: Environment.COOKIES_KEY,
        })

        const readUserSession = await selectOne({
            database: Clients.platformPostgresql,
            table: models.userSession,
            where: (table) => eq(table.token, userSessionToken)
        })

        if (readUserSession.isActive === false) {
            // Set cookies
            parameters.context.response.setHeader(
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
            parameters.context.response.setHeader(
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

            throw new Exception({
                internalMessage: "Auth error",
                cause: "userSession.isActive is false"
            })
        }

        return readUserSession
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Auth error",
            externalMessage: "Not authenticated",
            rawError: error
        })
    }
}
