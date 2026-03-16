import { readUserRouteDefinition, signOutRouteDefinition } from "@boilerplate/metadata/routes"
import { IconBook, IconChevronUp, IconLogout, IconUser } from "@tabler/icons-react"
import { css } from "../../../../../styled-system/css"
import { ButtonGhostContent } from "../../../../components/button/buttonGhostContent"
import { ButtonOutlineContent } from "../../../../components/button/buttonOutlineContent"
import { DataWrapper } from "../../../../components/data/dataWrapper"
import { Popover } from "../../../../components/layouts/popover"
import { sendToast } from "../../../../components/layouts/toast/sendToast"
import { rootRouter } from "../../../../routes/rootRouter"
import { setCookie } from "../../../../utilities/cookies/setCookie"
import { cookiePrefix } from "../../../../utilities/cookies/variables"
import { fetchAPIResponse } from "../../../../utilities/fetchAPIResponse"


export function UserPopover(props: {
    onActionSubmitted: () => void
}) {

    return (
        <DataWrapper
            routeDefinition={readUserRouteDefinition}
            body={{}}
        >
            {(user) => {
                if (user.isActive === false) {
                    rootRouter.navigate({
                        to: "/activation",
                        reloadDocument: true,
                    })
                }
                return (
                    <Popover
                        triggerElement={
                            <button
                                className={css({
                                    minWidth: "fit-content",
                                    width: "100%",
                                    height: "fit-content",
                                })}
                            >
                                <ButtonOutlineContent
                                    leftIcon={<IconUser />}
                                    text={user.email}
                                    rightIcon={<IconChevronUp />}
                                    className={css.raw({
                                        width: "100%",
                                        justifyContent: "start"
                                    })}
                                />
                            </button>
                        }
                        position="top"
                    >
                        {(context) => {
                            return (
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        alignItems: "start",
                                    })}
                                >
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "start",
                                            alignItems: "start",
                                            gap: "0.25rem",
                                            padding: "0.5rem",
                                        })}
                                    >
                                        {/* <Link
                                            to="/settings/user"
                                            params={{}}
                                            onClick={() => {
                                                context.setIsOpen(false)
                                                props.onActionSubmitted()
                                            }}
                                            className={css({
                                                width: "100%",
                                            })}
                                        >
                                            <ButtonGhostContent
                                                leftIcon={<IconSettings />}
                                                text={"User settings"}
                                                className={css.raw({
                                                    width: "100%"
                                                })}
                                            />
                                        </Link> */}
                                        <a
                                            href={`${import.meta.env.VITE_DOCS_BASE_URL}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => {
                                                context.setIsOpen(false)
                                                props.onActionSubmitted()
                                            }}
                                            className={css({
                                                width: "100%"
                                            })}
                                        >
                                            <ButtonGhostContent
                                                leftIcon={<IconBook />}
                                                text={"Documentation"}
                                                // rightIcon={<IconExternalLink />}
                                                className={{
                                                    width: "100%"
                                                }}
                                            />
                                        </a>
                                        <button
                                            onClick={async () => {
                                                await fetchAPIResponse({
                                                    routeDefinition: signOutRouteDefinition,
                                                    body: {},
                                                })
                                                sendToast({
                                                    type: "success",
                                                    description: "Disconnected."
                                                })

                                                context.setIsOpen(false)
                                                props.onActionSubmitted()

                                                setCookie(`${cookiePrefix}_${"authenticated"}`)
                                                rootRouter.navigate({
                                                    to: "/sign-in",
                                                    reloadDocument: true,
                                                })
                                            }}
                                            className={css({
                                                width: "100%"
                                            })}
                                        >
                                            <ButtonGhostContent
                                                leftIcon={<IconLogout />}
                                                text={"Sign out"}
                                                className={css.raw({
                                                    width: "100%"
                                                })}
                                            />
                                        </button>
                                    </div>
                                </div>
                            )
                        }}
                    </Popover>
                )
            }}
        </DataWrapper>
    )
}
