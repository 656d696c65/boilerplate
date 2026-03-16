import { signOutRouteDefinition } from "@boilerplate/metadata/routes"
import { IconLogout, IconReload } from "@tabler/icons-react"
import { css } from "../../../styled-system/css"
import { ButtonOutlineContent } from "../../components/button/buttonOutlineContent"
import { sendToast } from "../../components/layouts/toast/sendToast"
import { rootRouter } from "../../routes/rootRouter"
import { setCookie } from "../../utilities/cookies/setCookie"
import { cookiePrefix } from "../../utilities/cookies/variables"
import { fetchAPIResponse } from "../../utilities/fetchAPIResponse"


export function ErrorPage() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                height: "100%",
                width: "100%",
            })}
        >
            <span>
                Error retrieving your data
            </span>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <button
                    onClick={async () => {
                        rootRouter.navigate({
                            to: "/",
                            reloadDocument: true,
                        })
                    }}
                    className={css({})}
                >
                    <ButtonOutlineContent
                        leftIcon={<IconReload />}
                        text={"Try again"}
                        className={css.raw({})}
                    />
                </button>
                <button
                    onClick={async () => {
                        await fetchAPIResponse({
                            routeDefinition: signOutRouteDefinition,
                            body: {},
                        })
                        sendToast({
                            type: "error",
                            description: "Disconnected."
                        })

                        setCookie(`${cookiePrefix}_${"authenticated"}`)
                        rootRouter.navigate({
                            to: "/sign-in",
                            reloadDocument: true,
                        })
                    }}
                    className={css({})}
                >
                    <ButtonOutlineContent
                        leftIcon={<IconLogout />}
                        text={"Sign out"}
                        className={css.raw({})}
                    />
                </button>
            </div>
        </div>
    )
}