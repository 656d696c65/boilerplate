import { Clients } from "../clients.js"
import { Exception } from "../exception.js"


export async function sendEmail(parameters: {
    to: Array<string>
    subject: string
    body: {
        text: string
        html?: string
    }
}) {
    try {
        const sentMessageInfo = await Clients.nodemailer.sendMail({
            from: '"Boilerplate" <noreply@boilerplate.com>',
            to: parameters.to.join(", "),
            subject: parameters.subject,
            text: parameters.body.text,
            html: parameters.body.html,
        })
        return sentMessageInfo
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error sending the email",
            rawError: error,
        })
    }
}