export function createShutdownController() {
    let isShuttingDown = false

    function requestShutdown() {
        if (isShuttingDown) {
            return
        }

        isShuttingDown = true
        console.log("Shutdown requested")
    }

    function shouldStop() {
        return isShuttingDown
    }

    return {
        requestShutdown,
        shouldStop,
    }
}
