import * as v from "valibot"
import { booleanSchema } from "../../components/schemas/booleanSchema.js"
import { routeDefinition } from "../../utilities.index.js"
import { prefix } from "../../utilities/prefix.js"


export const statusRouteDefinition = routeDefinition({
    methods: ["GET"],
    path: `${prefix.public}`,
    schemas: {
        input: v.object({}),
        output: v.object({
            status: v.nonNullable(booleanSchema)
        })
    }
})