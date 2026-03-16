import { models } from "@boilerplate/metadata/orm"
import { signUpRouteDefinition } from "@boilerplate/metadata/routes"
import { generateId } from "@boilerplate/metadata/utilities"
import { pbkdf2Sync } from "crypto"
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


export const signUpRoute = routeHandler({
    definition: signUpRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: signUpRouteDefinition.schemas.input
        })

        const userSession = await Clients.platformPostgresql.transaction(async (transaction) => {

            const passwordSalt = generateId()
            const passwordHash = pbkdf2Sync(body.password, passwordSalt, 128000, 64, "sha512").toString("hex")

            const email = body.email.trim().toLowerCase()
            const createUser = await insertOne({
                database: transaction,
                table: models.user,
                data: {
                    id: generateId(),
                    isArchived: false,
                    isActive: false,
                    email: email,
                    passwordSalt: passwordSalt,
                    passwordHash: passwordHash,
                    lastUpdatedAt: null,
                    createdAt: new Date().toISOString(),
                }
            })


            // Store the session
            const createUserSession = await insertOne({
                database: transaction,
                table: models.userSession,
                data: {
                    id: generateId(),
                    idUser: createUser.id,
                    isActive: true,
                    token: generateId(),
                    ip: getRemoteAddress({ context: context }),
                    lastUpdatedAt: null,
                    createdAt: new Date().toISOString(),
                }
            })

            return createUserSession
        })

        // Set cookies
        context.response.setHeader(
            "Set-Cookie",
            [
                serializeCookie({
                    name: `${cookiePrefix}_${"user_session_token"}`,
                    value: signString({
                        value: userSession.id,
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