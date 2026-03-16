import * as v from "valibot"
import { Exception } from "./exception.js"


export function validate<
    TSchema extends v.GenericSchema<unknown, unknown>
>(parameters: {
    schema: TSchema
    data: unknown
}) {

    const parsed = v.safeParse(
        parameters.schema,
        parameters.data,
        {
            abortEarly: true,
            abortPipeEarly: true,
        },
    )

    if (parsed.success === false) {
        throw new Exception({
            internalMessage: "Data validation error",
            cause: JSON.stringify(v.flatten(parsed.issues)),
        })
    }

    return parsed.output
}