import * as v from "valibot"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const askForMagicLinkUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/ask-for-magic-link-user-token`,
    schemas: {
        input: v.object({
            email: v.message(
                v.nonNullable(userTokenSchema.entries.email),
                "Email is required."
            )
        }),
        output: v.object({})
    }
})