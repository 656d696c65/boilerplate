import * as v from "valibot"
import { varcharSchema } from "../../../components/schemas/varcharSchema.js"
import { userTokenSchema } from "../../../schemas/userToken.schema.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const consumeUpdatePasswordUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/consume-update-password-user-token`,
    schemas: {
        input: v.object({
            passwordToken: v.message(
                userTokenSchema.entries.value,
                "Password code is required."
            ),
            newPassword: v.message(
                v.nonNullable(varcharSchema({ maxLength: 256 })),
                "New password is required."
            ),
            confirmNewPassword: v.message(
                v.nonNullable(varcharSchema({ maxLength: 256 })),
                "Confirm new password is required."
            ),
        }),
        output: v.object({})
    }
})