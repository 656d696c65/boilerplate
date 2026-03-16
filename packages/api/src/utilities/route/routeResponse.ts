import * as v from "valibot"
import type { BaseContext } from "../api/baseContext.js"
import type { StatusCode } from "./statusCode.js"


export function routeResponse<
    TSchema extends v.GenericSchema,
    TData = v.InferOutput<TSchema>
>(parameters: {
    context: BaseContext
    statusCode: StatusCode
    bodySchema?: TSchema
    bodyValue: TData
}) {
    // if (Environment.VERBOSE === "true") {
    //     if (Array.isArray(parameters.bodyValue)) {
    //         console.info(parameters.statusCode, parameters.bodyValue.slice(0, 1))
    //     }
    //     else {
    //         console.info(parameters.statusCode, parameters.bodyValue)
    //     }
    // }
    return ({
        context: parameters.context,
        statusCode: parameters.statusCode,
        bodyValue: parameters.bodyValue,
    })
}
