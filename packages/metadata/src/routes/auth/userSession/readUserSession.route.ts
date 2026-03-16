import * as v from "valibot"
import { userSchema, userSessionSchema } from "../../../schemas.index.js"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const readUserSessionRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/read-user-session`,
    schemas: {
        input: v.object({}),
        output: v.object({
            id: userSessionSchema.entries.id,
            idUser: userSessionSchema.entries.idUser,
            createdAt: userSchema.entries.createdAt,
        })
    }
})