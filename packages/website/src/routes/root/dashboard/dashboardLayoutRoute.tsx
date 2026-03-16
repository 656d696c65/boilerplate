import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/circularLoader.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/dashboard",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ context }) => {
        if (context.isAuthenticated !== true) {
            throw redirect({
                to: "/connexion",
            })
        }
    },
    component: lazyRouteComponent(() => import("../../../features/dashboard/dashboardLayout.js"), "DashboardLayout"),
})
