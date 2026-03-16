import type { IncomingMessage } from "http"
import { Exception } from "../exception.js"


export async function processBody(request: IncomingMessage) {
    try {
        const chunks: Buffer[] = []
        for await (const chunk of request) {
            chunks.push(chunk)
        }
        const rawBody = Buffer.concat(chunks).toString("utf-8")

        if (request.method === "GET" || request.method === "HEAD") {
            return undefined
        }

        try {
            const body = JSON.parse(rawBody)
            return body as Record<string, unknown>
        }
        catch (error: unknown) {
            const body: Record<string, string> = {}

            rawBody.split("\n").forEach((line) => {
                const [key, ...rest] = line.split("=")
                if (key) {
                    body[key] = rest.join("=")
                }
            })
            return body
        }
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Body can not be processed",
            rawError: error,
        })
    }
}