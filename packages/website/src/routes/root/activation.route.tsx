import { createRoute } from "@tanstack/react-router"
import { ActivationPage } from "../../features/root/activation/activationPage.js"
import { rootLayoutRoute } from "../rootLayout.route.js"


export const activationRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: '/activation',
    beforeLoad: async () => {
        // const response = await fetchAPIResponse({
        //     routeDefinition: askForActivationUserTokenRouteDefinition,
        //     body: {},
        // })
        // if (response.success === false) {
        //     sendToast({
        //         type: "error",
        //         description: "An error occurred while sending the activation code.",
        //     })
        //     return
        // }

        // sendToast({
        //     type: "success",
        //     description: "Activation code sent."
        // })

        return ({
            title: "Activation"
        })
    },
    component: () => (<ActivationPage />)
})
