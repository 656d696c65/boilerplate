import { askForActivationUserTokenRouteDefinition, signOutRouteDefinition } from "@boilerplate/metadata/routes"
import { IconLogout, IconSend } from "@tabler/icons-react"
import { css } from "../../../../styled-system/css"
import { ButtonOutlineContent } from "../../../components/button/buttonOutlineContent"
import { Beta } from "../../../components/layouts/beta"
import { Logo } from "../../../components/layouts/logo"
import { sendToast } from "../../../components/layouts/toast/sendToast"
import { rootRouter } from "../../../routes/rootRouter"
import { fetchAPIResponse } from "../../../utilities/fetchAPIResponse"
import { ActivationForm } from "./activationForm"


export function ActivationPage() {
    return (
        <div
            className={css({
                height: "fit-content",
                overflow: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                margin: "auto",
                padding: "1rem",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "md",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "2rem",
                    padding: "2rem",
                    borderColor: "neutral/50",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    borderRadius: "0.5rem",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderBottomColor: "neutral/50",
                        borderBottomStyle: "dashed",
                        borderBottomWidth: "1px",
                        paddingBottom: "2rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.25rem",
                        })}
                    >
                        <Logo />
                        <Beta />
                    </div>
                    <span
                        className={css({
                            fontSize: "1rem",
                            color: "neutral/75",
                        })}
                    >
                        Activate your account
                    </span>
                </div>
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "md",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    <ActivationForm />
                </div>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.25rem",
                        borderTopColor: "neutral/50",
                        borderTopStyle: "dashed",
                        borderTopWidth: "1px",
                        paddingTop: "2rem",
                    })}
                >
                    <button
                        onClick={async () => {
                            const response = await fetchAPIResponse({
                                routeDefinition: askForActivationUserTokenRouteDefinition,
                                body: {},
                            })
                            if (response.success === false) {
                                sendToast({
                                    type: "error",
                                    description: "An error occurred while sending the activation code.",
                                })
                                return
                            }

                            sendToast({
                                type: "success",
                                description: "Activation code sent."
                            })
                        }}
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonOutlineContent
                            leftIcon={<IconSend />}
                            text="Send activation code"
                            className={{
                                width: "100%",
                                justifyContent: "center",
                            }}
                        />
                    </button>
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

                            rootRouter.navigate({
                                to: "/sign-in",
                                reloadDocument: true,
                            })
                        }}
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonOutlineContent
                            text="Sign out"
                            leftIcon={<IconLogout />}
                            className={{
                                width: "100%",
                                justifyContent: "center",
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}