import { createRoute, redirect } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/layouts/circularLoader"
import { AuthLayout } from "../../../features/root/auth/authLayout"
import { getAuthenticated } from "../../../utilities/cookies/getAuthenticated"
import { rootLayoutRoute } from "../../rootLayout.route"


export const authLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "authLayout",
    pendingComponent: () => (
        <CircularLoader
            className={{
                margin: "auto"
            }}
        />
    ),
    beforeLoad: async () => {
        if (getAuthenticated() !== true) {
            throw redirect({
                to: "/sign-in"
            })
        }
    },
    component: () => (<AuthLayout />)
})
