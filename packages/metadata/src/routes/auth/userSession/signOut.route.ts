import * as v from "valibot"
import { routeDefinition } from "../../../utilities/index.js"


export const signOutRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/auth/sign-out`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})