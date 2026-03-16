import * as v from "valibot"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const consumeUpdateEmailUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/consume-update-email-user-token`,
    schemas: {
        input: v.object({
            currentEmailToken: v.message(
                userTokenSchema.entries.value,
                "Code received on the current email is required."
            ),
            newEmailToken: v.message(
                userTokenSchema.entries.value,
                "Code received on the new email is required."
            ),
        }),
        output: v.object({})
    }
})