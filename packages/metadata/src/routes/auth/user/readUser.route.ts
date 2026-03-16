import * as v from "valibot"
import { userSchema } from "../../../schemas.index.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const readUserRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/read-user`,
    schemas: {
        input: v.object({}),
        output: v.object({
            id: userSchema.entries.id,
            isActive: userSchema.entries.isActive,
            email: userSchema.entries.email,
            createdAt: userSchema.entries.createdAt,
        })
    }
})