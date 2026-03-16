import * as v from "valibot"
import { booleanSchema } from "../../components/schemas/booleanSchema.js"
import { routeDefinition } from "../../utilities/index.js"


export const statusRouteDefinition = routeDefinition({
    methods: ["GET"],
    path: `/`,
    schemas: {
        input: v.object({}),
        output: v.object({
            status: v.nonNullable(booleanSchema)
        })
    }
})