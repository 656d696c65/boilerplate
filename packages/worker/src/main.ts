import { processJobs } from "./jobs/processJobs.js"
import { startWorker } from "./startWorker.js"
import { createShutdownController } from "./utilities/handleShutdown.js"

const shutdown = createShutdownController()

process.on("SIGINT", shutdown.requestShutdown)
process.on("SIGTERM", shutdown.requestShutdown)

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
    shutdown.requestShutdown()
})

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason)
    shutdown.requestShutdown()
})

await startWorker({
    shouldStop: shutdown.shouldStop,
    processJobs,
})
