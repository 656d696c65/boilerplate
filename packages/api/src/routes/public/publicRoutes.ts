import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { statusRoute } from "./status.route.js"


export const publicRoutes: Array<ReturnType<typeof routeHandler>> = [
    statusRoute,
]