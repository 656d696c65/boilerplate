import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/circularLoader.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const signInRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/connexion",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({ to: "/dashboard" })
        }
        return {
            title: "Connexion",
        }
    },
    component: lazyRouteComponent(() => import("../../../features/signIn/signInPage.js"), "SignInPage"),
})
