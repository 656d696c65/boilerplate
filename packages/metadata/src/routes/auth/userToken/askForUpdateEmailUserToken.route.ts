import * as v from "valibot"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const askForUpdateEmailUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/ask-for-update-email-user-token`,
    schemas: {
        input: v.object({
            newEmail: v.message(
                v.nonNullable(userTokenSchema.entries.email),
                "New email is required."
            )
        }),
        output: v.object({})
    }
})