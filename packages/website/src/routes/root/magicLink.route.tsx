import { consumeMagicLinkUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { createRoute, redirect } from "@tanstack/react-router"
import { sendToast } from "../../components/layouts/toast/sendToast.js"
import { MagicLinkPage } from "../../features/root/magicLink/magicLink.page.js"
import { getAuthenticated } from "../../utilities/cookies/getAuthenticated.js"
import { fetchAPIResponse } from "../../utilities/fetchAPIResponse.js"
import { rootLayoutRoute } from "../rootLayout.route.js"


export const magicLinkRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/magic-link',
    validateSearch: (search: Record<string, unknown>): { token?: string } => {
        return {
            token: (search.token === undefined)
                ? undefined
                : String(search.token)
        }
    },
    beforeLoad: async ({ search }) => {
        if (search.token !== undefined) {
            const response = await fetchAPIResponse({
                routeDefinition: consumeMagicLinkUserTokenRouteDefinition,
                body: {
                    signInToken: search.token
                },
            })
            if (response.success === false) {
                sendToast({
                    type: "error",
                    description: "The magic link is invalid or expired. Please request a new one.",
                })
                throw redirect({
                    to: "/magic-link"
                })
            }
            sendToast({
                type: "success",
                description: "Authenticated",
            })
            throw redirect({
                to: "/"
            })
        }
        if (getAuthenticated() === true) {
            throw redirect({
                to: "/"
            })
        }
        return ({
            title: "Magic link"
        })
    },
    component: () => (<MagicLinkPage />)
})
