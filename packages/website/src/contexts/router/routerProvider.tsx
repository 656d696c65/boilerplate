import { RouterProvider as Router } from "@tanstack/react-router"
import { rootRouter } from "../../routes/rootRouter.js"


export function RouterProvider() {
    return (
        <Router
            router={rootRouter}
        />
    )
}
