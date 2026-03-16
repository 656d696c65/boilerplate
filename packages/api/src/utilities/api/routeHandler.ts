import type { routeDefinition } from "@boilerplate/metadata/utilities"
import * as v from "valibot"
import type { routeResponse } from "../route/routeResponse.js"
import type { BaseContext } from "./baseContext.js"


export function routeHandler<
    TContext extends BaseContext,
    TPath extends string,
    TSchemaInput extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaOutput extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    definition: ReturnType<typeof routeDefinition<
        TPath,
        TSchemaInput,
        TSchemaOutput
    >>
    // middlewares: Array<
    //     typeof middlewareHandler<TContext>
    // >
    handler: (parameters: {
        context: TContext
    }) => Promise<ReturnType<typeof routeResponse<TSchemaOutput>>>
}) {
    return ({
        definition: parameters.definition,
        // middlewares: parameters.middlewares,
        handler: parameters.handler,
    })
}