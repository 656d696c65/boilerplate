import { userModel, userTokenModel } from "@boilerplate/metadata/orm"
import { askForMagicLinkUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { generateId } from "@boilerplate/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { Environment } from "../../../utilities/environment.js"
import { Exception } from "../../../utilities/exception.js"
import { sendEmail } from "../../../utilities/mail/sendEmail.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"


export const askForMagicLinkUserTokenRoute = routeHandler({
    definition: askForMagicLinkUserTokenRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: askForMagicLinkUserTokenRouteDefinition.schemas.input
        })

        try {
            const readUser = await selectOne({
                database: Clients.platformPostgresql,
                table: userModel,
                where: (table) => (
                    and(
                        eq(table.email, body.email)
                    )
                )
            })

            const createdUserToken = await insertOne({
                database: Clients.platformPostgresql,
                table: userTokenModel,
                data: {
                    id: generateId(),
                    idUser: readUser.id,
                    type: "magic-link",
                    value: generateId(),
                    email: readUser.email,
                    isConsumed: false,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                    createdAt: new Date().toISOString(),
                }
            })
            const magicLink = `${Environment.WEBSITE_BASE_URL}/magic-link?token=${createdUserToken.value}`
            await sendEmail({
                to: [createdUserToken.email],
                subject: "Magic link authentication",
                body: {
                    text: `Hello,\n\nHere's your magic link (expires in 15 minutes): ${magicLink}`
                },
            })
            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {},
            })
        }
        catch (error: unknown) {
            new Exception({
                statusCode: 200,
                rawError: error,
            })
            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {},
            })
        }
    }
})