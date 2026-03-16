import type { IncomingMessage, ServerResponse } from "http"
import { routes } from "../../routes/routes.js"
import { Environment } from "../environment.js"
import { Exception } from "../exception.js"
import { logger } from "../logger/logger.js"
import { fetchRoute } from "../route/fetchRoute.js"
import { routeRequest } from "../route/routeRequest.js"
import { processBody } from "./processBody.js"


export async function requestListener(request: IncomingMessage, response: ServerResponse) {
    try {

        response.setHeader('Access-Control-Allow-Origin', Environment.CORS_ORIGIN)
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        response.setHeader('Access-Control-Allow-Headers', ['Content-Type', "x-api-key"])
        response.setHeader('Access-Control-Allow-Credentials', String(true))

        if (request.method === 'OPTIONS') {
            response.writeHead(204)
            return response.end()
        }

        const abortController = new AbortController()

        const rawUrl = request.url
        const rawMethod = request.method
        if (rawUrl === undefined || rawMethod === undefined) {
            response.writeHead(400)
            return response.end("Bad request")
        }

        const url = `https://${request.headers.host}${rawUrl}`
        // const body = await processBody(request)
        const body = await processBody(request)

        const newRequest = routeRequest({
            locale: request.headers["accept-language"]?.split(",")[0],
            cache: "default",
            credentials: "include",
            headers: request.headers,
            method: rawMethod,
            mode: "cors",
            url: new URL(url),
            keepAlive: true,
            signal: abortController.signal,
            body: body,
        })

        let responseBody = undefined
        let cause = undefined
        try {
            const fetchResponse = await fetchRoute({
                context: {
                    request: newRequest,
                    response: response,
                },
                routes: routes
            })
            response = fetchResponse.context.response
            response.statusCode = fetchResponse.statusCode

            responseBody = JSON.stringify(fetchResponse.bodyValue)
        }
        catch (error: unknown) {
            if (Environment.ENV === "production") {
                console.log(error)
            }
            if (error instanceof Exception) {
                response.statusCode = error.statusCode
                cause = error.cause
                responseBody = error.externalMessage
            }
            else {
                response.statusCode = 500
                responseBody = "Internal error"
            }
        }

        response.write(responseBody)
        response.end()

        if (Environment.ENV === "production") {
            response.on("finish", () => {
                logger.info({
                    request: newRequest,
                    response: {
                        statusCode: response.statusCode,
                        headers: response.getHeaders(),
                        body: responseBody,
                    },
                    error: {
                        cause: cause,
                    }
                })
            })
        }


        return
    }
    catch (error: unknown) {
        if (Environment.ENV === "development") {
            console.log(error)
        }
        else {
            logger.info(error)
        }
        response.end("Internal error")
        return
    }
}
