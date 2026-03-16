import { type LinkProps, createRouter } from "@tanstack/react-router"
import { rootTree } from "./rootTree.js"



export type ValidRoutes = LinkProps["to"]


export const rootRouter = createRouter({
    routeTree: rootTree,
    context: {
        title: undefined
    }
})


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof rootRouter
    }
}
