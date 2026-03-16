import type { AnyRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute"
import { dashboardRootRoute } from "./dashboardRootRoute"

export const dashboardTree: AnyRoute = dashboardLayoutRoute.addChildren([
    dashboardRootRoute,
])
