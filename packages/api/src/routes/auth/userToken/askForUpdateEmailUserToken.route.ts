import { userModel, userTokenModel } from "@boilerplate/metadata/orm"
import { askForUpdateEmailUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { generateId } from "@boilerplate/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { generateToken } from "../../../utilities/generateToken.js"
import { sendEmail } from "../../../utilities/mail/sendEmail.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"


export const askForUpdateEmailUserTokenRoute = routeHandler({
    definition: askForUpdateEmailUserTokenRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })
        const body = await validateBodyMiddleware({
            context: context,
            schema: askForUpdateEmailUserTokenRouteDefinition.schemas.input
        })

        const readUser = await selectOne({
            database: Clients.platformPostgresql,
            table: userModel,
            where: (table) => (
                eq(table.id, userSession.idUser)
            )
        })

        const createdOldEmailUserToken = await insertOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            data: {
                id: generateId(),
                idUser: readUser.id,
                type: "update-email",
                value: generateToken(),
                email: readUser.email,
                isConsumed: false,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
            }
        })
        await sendEmail({
            to: [createdOldEmailUserToken.email],
            subject: "Update email code",
            body: {
                text: `Hello,\n\nYou asked for a user email update.\nCode (expires in 15 minutes): ${createdOldEmailUserToken.value}`
            },
        })

        const createdNewEmailUserToken = await insertOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            data: {
                id: generateId(),
                idUser: readUser.id,
                type: "update-email",
                value: generateToken(),
                email: body.newEmail,
                isConsumed: false,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
            }
        })
        await sendEmail({
            to: [createdNewEmailUserToken.email],
            subject: "Update email token",
            body: {
                text: `Hello,\n\nYou asked for a user email update.\nCode (expires in 15 minutes): ${createdNewEmailUserToken.value}`
            },
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})