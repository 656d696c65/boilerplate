import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { CircularLoader } from "../components/layouts/circularLoader.js"
import { RootLayout } from "../features/rootLayout.js"


export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
}>()({
    pendingComponent: () => (
        <CircularLoader
            text="Boilerplate Console loading..."
            className={{
                margin: "auto"
            }}
        />
    ),
    beforeLoad: () => ({}),
    component: () => {
        const matches = useRouterState({ select: (s) => s.matches })

        const matchWithTitle = [...matches]
            .reverse()
            .find((d) => d.context.title)

        const title = (matchWithTitle?.context.title === undefined)
            ? "Console | Boilerplate"
            : `${matchWithTitle.context.title} | Console | Boilerplate`

        return (
            <Fragment>
                <title>{title}</title>
                <RootLayout />
            </Fragment>
        )
    },
})
