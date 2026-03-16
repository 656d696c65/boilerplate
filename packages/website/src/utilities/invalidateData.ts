import type { routeDefinition } from "@boilerplate/metadata/utilities"
import * as v from "valibot"
import { dataClient } from "../contexts/data/queryClient"


export async function invalidateData<
    TSchemaInput extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaOutput extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<
        string,
        TSchemaInput,
        TSchemaOutput
    >>
    body: v.InferOutput<TSchemaInput>
    exact?: boolean
}) {
    dataClient.invalidateQueries({
        queryKey: [
            parameters.routeDefinition.path,
            parameters.body
        ],
        exact: parameters.exact ?? true,
    })

}