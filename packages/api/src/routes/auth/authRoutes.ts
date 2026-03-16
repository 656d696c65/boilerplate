import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { deleteUserRoute } from "./user/deleteUser.route.js"
import { readUserRoute } from "./user/readUser.route.js"
import { updateUserRoute } from "./user/updateUser.route.js"
import { readUserSessionRoute } from "./userSession/readUserSession.route.js"
import { signInRoute } from "./userSession/signIn.route.js"
import { signOutRoute } from "./userSession/signOut.route.js"
import { signUpRoute } from "./userSession/signUp.route.js"


export const authRoutes: Array<ReturnType<typeof routeHandler>> = [

    // user
    deleteUserRoute,
    readUserRoute,
    updateUserRoute,

    // userSession
    readUserSessionRoute,
    signInRoute,
    signOutRoute,
    signUpRoute,
]