import { catchRoute } from './catch.route.js'
import { activationRoute } from './root/activation.route.js'
import { authLayoutRoute } from './root/auth/authLayout.route.js'
import { homeRoute } from './root/auth/homeRoute.js'
import { errorRoute } from './root/errorRoute.js'
import { magicLinkRoute } from './root/magicLink.route.js'
import { signInRoute } from './root/signInRoute.js'
import { signUpRoute } from './root/signUp.route.js'
import { rootLayoutRoute } from './rootLayout.route.js'


export const rootTree = rootLayoutRoute.addChildren([
    authLayoutRoute.addChildren([
        homeRoute,
    ]),
    signUpRoute,
    signInRoute,
    magicLinkRoute,
    activationRoute,
    errorRoute,
    catchRoute,
])
