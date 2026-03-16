import { userModel, userTokenModel } from "@boilerplate/metadata/orm"
import { consumeUpdateEmailUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { and, eq, or } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSession.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { Exception } from "../../../utilities/exception.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { update } from "../../../utilities/sql/updateOne.js"


export const consumeUpdateEmailUserTokenRoute = routeHandler({
    definition: consumeUpdateEmailUserTokenRouteDefinition,
    handler: async ({ context }) => {
        const userSession = await checkUserSessionMiddleware({
            context: context
        })
        const body = await validateBodyMiddleware({
            context: context,
            schema: consumeUpdateEmailUserTokenRouteDefinition.schemas.input
        })

        const readUser = await selectOne({
            database: Clients.platformPostgresql,
            table: userModel,
            where: (table) => (
                eq(table.id, userSession.idUser)
            )
        })

        const readUserTokenCurrentEmail = await selectOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            where: (table) => (
                and(
                    eq(table.idUser, readUser.id),
                    eq(table.value, body.currentEmailToken),
                    eq(table.type, "update-email"),
                    eq(table.isConsumed, false),
                )
            )
        })
        if (new Date().getTime() > new Date(readUserTokenCurrentEmail.expiresAt).getTime()) {
            throw new Exception({
                internalMessage: "Token is expired"
            })
        }

        const readUserTokenNewEmail = await selectOne({
            database: Clients.platformPostgresql,
            table: userTokenModel,
            where: (table) => (
                and(
                    eq(table.idUser, readUser.id),
                    eq(table.value, body.newEmailToken),
                    eq(table.type, "update-email"),
                    eq(table.isConsumed, false),
                )
            )
        })
        if (new Date().getTime() > new Date(readUserTokenNewEmail.expiresAt).getTime()) {
            throw new Exception({
                internalMessage: "Token is expired"
            })
        }

        await Clients.platformPostgresql.transaction(async (transaction) => {
            await update({
                database: transaction,
                table: userModel,
                data: {
                    email: readUserTokenNewEmail.email,
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
                table: userTokenModel,
                data: {
                    isConsumed: true,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => (
                    or(
                        eq(table.id, readUserTokenCurrentEmail.id),
                        eq(table.id, readUserTokenNewEmail.id)
                    )
                )
            })
        })

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {},
        })
    }
})