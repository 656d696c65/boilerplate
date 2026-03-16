import { Exception } from "./exception.js"


export function timeoutPromise(timeoutMs: number) {
    return new Promise((_, reject) =>
        setTimeout(
            () => reject(
                new Exception({
                    internalMessage: "Timeout reached",
                })
            ),
            timeoutMs)
    )
} 