import * as v from "valibot"
import { routeDefinition } from "../../../utilities.index.js"
import { prefix } from "../../../utilities/prefix.js"


export const askForActivationUserTokenRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `${prefix.auth}/ask-for-activation-user-token`,
    schemas: {
        input: v.object({}),
        output: v.object({})
    }
})