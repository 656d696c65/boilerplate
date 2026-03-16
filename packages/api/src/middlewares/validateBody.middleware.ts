import * as v from "valibot"
import type { BaseContext } from "../utilities/api/baseContext.js"
import { Exception } from "../utilities/exception.js"
import { validate } from "../utilities/validate.js"


export async function validateBodyMiddleware<
    TSchema extends v.GenericSchema<unknown, unknown>
>(parameters: {
    context: BaseContext
    schema: TSchema
}) {
    try {
        const rawBody = parameters.context.request.body
        const validatedBody = validate({
            schema: parameters.schema,
            data: rawBody
        })
        return validatedBody
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "The body object can not be parsed",
            externalMessage: "Invalid request",
            rawError: error
        })
    }
}
