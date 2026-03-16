import * as v from "valibot"


export type HTTPMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE" | "CONNECT"

export function routeDefinition<
    TPath extends string,
    TSchemaInput extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaOutput extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    methods: Array<HTTPMethod>
    path: TPath,
    schemas: {
        input: TSchemaInput
        output: TSchemaOutput
    }
}) {
    return ({
        methods: parameters.methods,
        path: parameters.path,
        schemas: parameters.schemas,
    })
}