import { readUserRouteDefinition } from "@boilerplate/metadata/routes"
import { createRoute, redirect } from "@tanstack/react-router"
import { fetchAPIResponse } from "../../../utilities/fetchAPIResponse.js"
import { authLayoutRoute } from "./authLayout.route.js"


export const homeRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: '/',
    beforeLoad: async () => {
        const userResponse = await fetchAPIResponse({
            routeDefinition: readUserRouteDefinition,
            body: {},
        })
        if (userResponse.success === false) {
            throw redirect({
                to: "/error"
            })
        }
        if (userResponse.data.isActive === false) {
            throw redirect({
                to: "/activation",
                reloadDocument: true,
            })
        }
    }
})
