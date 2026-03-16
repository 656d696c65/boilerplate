import { createTransport } from "nodemailer"
import { Environment } from "../utilities/environment.js"
import { Exception } from "../utilities/exception.js"


export function nodemailerClient() {
    try {
        const client = createTransport({
            host: Environment.SMTP_HOST,
            port: Number(Environment.SMTP_PORT),
            secure: true,
            auth: {
                user: Environment.SMTP_USERNAME,
                pass: Environment.SMTP_PASSWORD,
            },
        })
        return client
    }
    catch (error) {
        throw new Exception({
            internalMessage: "Nodemailer client not available",
            rawError: error,
        })
    }
}