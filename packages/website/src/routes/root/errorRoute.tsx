import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayout.route.js"
import { ErrorPage } from "../../features/root/errorPage.js"


export const errorRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/error',
    beforeLoad: async () => ({
        title: "Error",
    }),
    component: () => (<ErrorPage />)
})
