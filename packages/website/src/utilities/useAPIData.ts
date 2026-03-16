import type { routeDefinition } from "@boilerplate/metadata/utilities"
import { useQuery } from "@tanstack/react-query"
import * as v from "valibot"
import { ClientError } from "./clientError.js"
import { fetchAPIResponse } from "./fetchAPIResponse.js"




export function useAPIData<
    TSchemaInput extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaOutput extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<
        string,
        TSchemaInput,
        TSchemaOutput
    >>
    body: v.InferOutput<TSchemaInput>
    enabled?: boolean
}) {

    const queryFn = async () => {

        const response = await fetchAPIResponse({
            routeDefinition: parameters.routeDefinition,
            body: parameters.body,
        })
        if (response.success === false) {
            throw new ClientError({
                message: "Error with the data fetching",
                rawError: response.error,
            })
        }

        return response.data
    }

    return useQuery({
        queryKey: [
            parameters.routeDefinition.path,
            parameters.body
        ],
        queryFn: queryFn,
        enabled: true,
        retry: 2,
        retryDelay: 1000,
        // enabled: parameters.enabled ?? true,
        // refetchOnMount: true,
    })
}
