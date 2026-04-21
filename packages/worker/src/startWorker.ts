type StartWorkerOptions = {
    shouldStop: () => boolean
    processJobs: () => Promise<void>
}

export async function startWorker(options: StartWorkerOptions) {
    console.log("Worker started")

    while (!options.shouldStop()) {
        try {
            await options.processJobs()
        } catch (error) {
            console.error("Worker loop error:", error)
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }

    console.log("Worker stopped")
}
