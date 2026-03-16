import * as v from "valibot"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const signOutRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/sign-out`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})