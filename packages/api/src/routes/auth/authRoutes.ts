import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { deleteUserRoute } from "./user/deleteUser.route.js"
import { readUserRoute } from "./user/readUser.route.js"
import { updateUserRoute } from "./user/updateUser.route.js"
import { readUserSessionRoute } from "./userSession/readUserSession.route.js"
import { signInRoute } from "./userSession/signIn.route.js"
import { signOutRoute } from "./userSession/signOut.route.js"
import { signUpRoute } from "./userSession/signUp.route.js"
import { askForActivationUserTokenRoute } from "./userToken/askForActivationUserToken.route.js"
import { askForMagicLinkUserTokenRoute } from "./userToken/askForMagicLinkUserToken.route.js"
import { askForUpdateEmailUserTokenRoute } from "./userToken/askForUpdateEmailUserToken.route.js"
import { askForUpdatePasswordUserTokenRoute } from "./userToken/askForUpdatePasswordUserToken.route.js"
import { consumeActivationUserTokenRoute } from "./userToken/consumeActivationUserToken.route.js"
import { consumeMagicLinkUserTokenRoute } from "./userToken/consumeMagicLinkUserToken.route.js"
import { consumeUpdateEmailUserTokenRoute } from "./userToken/consumeUpdateEmailUserToken.route.js"
import { consumeUpdatePasswordUserTokenRoute } from "./userToken/consumeUpdatePasswordUserToken.route.js"


export const authRoutes: Array<ReturnType<typeof routeHandler>> = [

    // user
    deleteUserRoute,
    readUserRoute,
    readUserSessionRoute,
    signInRoute,
    signOutRoute,
    signUpRoute,
    updateUserRoute,

    // userToken
    askForActivationUserTokenRoute,
    askForMagicLinkUserTokenRoute,
    askForUpdateEmailUserTokenRoute,
    askForUpdatePasswordUserTokenRoute,
    consumeActivationUserTokenRoute,
    consumeMagicLinkUserTokenRoute,
    consumeUpdateEmailUserTokenRoute,
    consumeUpdatePasswordUserTokenRoute,
]