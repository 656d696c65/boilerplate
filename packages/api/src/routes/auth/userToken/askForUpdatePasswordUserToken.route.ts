import { userModel, userTokenModel } from "@boilerplate/metadata/orm"
import { askForUpdatePasswordUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { generateId } from "@boilerplate/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { generateToken } from "../../../utilities/generateToken.js"
import { sendEmail } from "../../../utilities/mail/sendEmail.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"


export const askForUpdatePasswordUserTokenRoute = routeHandler({
    definition: askForUpdatePasswordUserTokenRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })
        // const body = await validateBodyMiddleware({
        //     context: context,
        //     schema: askForUpdatePasswordUserTokenRouteDefinition.schemas.input
        // })

        const readUser = await selectOne({
            database: Clients.platformPostgresql,
            table: userModel,
            where: (table) => (
                and(
                    eq(table.id, userSession.idUser)
                )
            )
        })

        const createdUserToken = await insertOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            data: {
                id: generateId(),
                idUser: readUser.id,
                type: "update-password",
                value: generateToken(),
                email: readUser.email,
                isConsumed: false,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
            }
        })
        await sendEmail({
            to: [createdUserToken.email],
            subject: "Update password code",
            body: {
                text: `Hello,\n\nYou asked for a user password update.\nCode (expires in 15 minutes): ${createdUserToken.value}`
            },
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})