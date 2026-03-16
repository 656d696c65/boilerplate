import * as v from "valibot"
import { routeDefinition } from "../../../utilities/index.js"


export const deleteUserRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/auth/delete-user`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})