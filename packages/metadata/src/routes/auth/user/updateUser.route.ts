import * as v from "valibot"
import { routeDefinition } from "../../../utilities/index.js"


export const updateUserRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/auth/update-user`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})