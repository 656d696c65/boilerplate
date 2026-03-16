import * as v from "valibot"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const consumeMagicLinkUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/consume-magic-link-user-token`,
    schemas: {
        input: v.object({
            signInToken: v.message(
                userTokenSchema.entries.value,
                "Magic link code is required."
            )
        }),
        output: v.object({})
    }
})