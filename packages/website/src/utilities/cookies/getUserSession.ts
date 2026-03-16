import { readUserSessionRouteDefinition } from "@boilerplate/metadata/routes"
import { fetchAPIResponse } from "../fetchAPIResponse.js"
import { getAuthenticated } from "./getAuthenticated.js"


export async function getUserSession() {
    const isAuthenticated = getAuthenticated()

    if (isAuthenticated === true) {
        const response = await fetchAPIResponse({
            routeDefinition: readUserSessionRouteDefinition,
            body: {},
        })
        if (response.success === false) {
            return undefined
        }
        return response.data
    }
    return undefined
}