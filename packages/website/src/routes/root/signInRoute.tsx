import { createRoute, redirect } from "@tanstack/react-router"
import { SignInPage } from "../../features/root/signIn/signIn.page.js"
import { getAuthenticated } from "../../utilities/cookies/getAuthenticated.js"
import { rootLayoutRoute } from "../rootLayout.route.js"


export const signInRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/sign-in',
    beforeLoad: async () => {
        if (getAuthenticated() === true) {
            throw redirect({
                to: "/"
            })
        }
        return ({
            title: "Sign in"
        })
    },
    component: () => (<SignInPage />)
})
