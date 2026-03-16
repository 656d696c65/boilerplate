import * as v from "valibot"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const deleteUserRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/delete-user`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})