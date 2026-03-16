import { createServer } from "http"
import { env } from "process"
import { Clients } from "./utilities/clients.js"
import { Environment } from "./utilities/environment.js"
import { requestListener } from "./utilities/server/requestListener.js"


export async function startServer() {

    while (true) {
        try {
            // Get variables and clients
            await Environment.init()
            await Clients.init()


            // Setup the server and connect to app
            const server = createServer((request, response) => requestListener(request, response))


            // Start the server
            server.listen(Number(Environment.PORT), () => {
                console.info(`Server running on http://localhost:${env.PORT}`)
            })

            // Wait indefinitely (prevents loop from restarting immediately)
            await new Promise(() => { })

        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error(JSON.stringify({
                    type: "error",
                    message: error.message,
                    cause: error.cause
                }, undefined, 2))
            }
            console.error(JSON.stringify({
                type: "error",
                message: "Unknown error",
                cause: error
            }, undefined, 2))


            console.error("Restarting in 3 seconds...")
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
}
