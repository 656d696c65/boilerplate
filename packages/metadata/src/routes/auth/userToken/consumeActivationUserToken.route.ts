import * as v from "valibot"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const consumeActivationUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/consume-activation-user-token`,
    schemas: {
        input: v.object({
            activationToken: v.message(
                userTokenSchema.entries.value,
                "Activation code is required."
            ),
        }),
        output: v.object({})
    }
})