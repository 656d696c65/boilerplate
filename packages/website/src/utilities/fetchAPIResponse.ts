import type { routeDefinition } from "@boilerplate/metadata/utilities"
import * as v from "valibot"
import { ClientError } from "./clientError.js"
import { validate } from "./validate.js"


export async function fetchAPIResponse<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<
        string,
        TSchemaBody,
        TSchemaReturn
    >>
    headers?: Record<string, string>
    body: v.InferOutput<TSchemaBody>
    signal?: AbortSignal
}) {
    try {
        const response = await fetch(
            new URL(`${import.meta.env.VITE_API_BASE_URL}${parameters.routeDefinition.path}`),
            {
                method: parameters.routeDefinition.methods.at(0),
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": navigator.language,
                    ...parameters.headers,
                },
                credentials: 'include',
                body: JSON.stringify(parameters.body),
                signal: parameters.signal
            }
        )
        const body = await response.text()
        if (response.ok === false) {
            throw new ClientError({
                message: body,
                cause: "Response is not a http success",
            })
        }

        const jsonBody = JSON.parse(body)
        const parsedData = validate({
            schema: parameters.routeDefinition.schemas.output,
            data: jsonBody,
        })
        if (parsedData.success === false) {
            throw new ClientError({
                message: "Error with the POST request body data validation",
                rawError: parsedData.error,
            })
        }

        return {
            success: true as const,
            data: parsedData.data,
            error: undefined
        }

    }
    catch (error: unknown) {

        return {
            success: false as const,
            data: undefined,
            error: new ClientError({
                rawError: error,
            }),
        }
    }
}