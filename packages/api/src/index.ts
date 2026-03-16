import { startServer } from "./startServer.js"


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
})

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason)
})

await startServer()