import { createRoute, redirect } from "@tanstack/react-router"
import { SignUpPage } from "../../features/root/signUp/signUp.page.js"
import { getAuthenticated } from "../../utilities/cookies/getAuthenticated.js"
import { rootLayoutRoute } from "../rootLayout.route.js"


export const signUpRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/sign-up',
    beforeLoad: async () => {
        if (getAuthenticated() === true) {
            throw redirect({
                to: "/"
            })
        }
        return ({
            title: "Sign up"
        })
    },
    component: () => (<SignUpPage />)
})
