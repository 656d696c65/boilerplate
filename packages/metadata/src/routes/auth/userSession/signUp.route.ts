import * as v from "valibot"
import { varcharSchema } from "../../../components/schemas/varcharSchema.js"
import { userSchema } from "../../../schemas.index.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const signUpRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/sign-up`,
    schemas: {
        input: v.object({
            email: v.message(
                v.nonNullable(userSchema.entries.email),
                "Email is required."
            ),
            password: v.message(
                v.nonNullable(varcharSchema({ maxLength: 256 })),
                "Password is required."
            ),
            confirmPassword: v.message(
                v.nonNullable(varcharSchema({ maxLength: 256 })),
                "Confirm password is required."
            ),
        }),
        output: v.object({})
    }
})