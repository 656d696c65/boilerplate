import { readUserRouteDefinition } from "@boilerplate/metadata/routes"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { css } from "../../../../../styled-system/css"
import { ButtonOutlineContent } from "../../../../components/button/buttonOutlineContent"
import { DataViewer } from "../../../../components/data/dataViewer/dataViewer"
import { DataWrapper } from "../../../../components/data/dataWrapper"
import { FormatText } from "../../../../components/data/formatText"
import { Page } from "../../../../components/layouts/page/page"
import { Section } from "../../../../components/layouts/section/section"
import { Separator } from "../../../../components/layouts/separator"
import { DeleteUserModal } from "./deleteUserModal"
import { UpdateEmailForm } from "./updateEmailForm"
import { UpdatePasswordForm } from "./updatePasswordForm"


export function UserSettingsPage() {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>
                    Settings
                </Page.Title>
                <Page.Description>
                    Manage your account settings.
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <DataWrapper
                    routeDefinition={readUserRouteDefinition}
                    body={{}}
                >
                    {(user) => {
                        return (
                            <Fragment>
                                <Section.Root>
                                    <Section.Header>
                                        <Section.Title>
                                            Credentials
                                        </Section.Title>
                                    </Section.Header>
                                    <Section.Body>
                                        <DataViewer.Root>
                                            <DataViewer.Element>
                                                <DataViewer.Label
                                                    label={"Email"}
                                                    description={"Used to sign in"}
                                                />
                                                <DataViewer.Value>
                                                    <FormatText>
                                                        {user.email}
                                                    </FormatText>
                                                </DataViewer.Value>
                                            </DataViewer.Element>
                                            <Separator />
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "start",
                                                    alignItems: "start",
                                                    gap: "0.5rem",
                                                })}
                                            >
                                                <UpdateEmailForm
                                                    triggerElement={
                                                        <button>
                                                            <ButtonOutlineContent
                                                                leftIcon={<IconPencil />}
                                                                text="Update email"
                                                            />
                                                        </button>
                                                    }
                                                /><UpdatePasswordForm
                                                    triggerElement={
                                                        <button>
                                                            <ButtonOutlineContent
                                                                leftIcon={<IconPencil />}
                                                                text="Update password"
                                                            />
                                                        </button>
                                                    }
                                                />
                                            </div>
                                        </DataViewer.Root>
                                    </Section.Body>
                                </Section.Root>
                                <Section.Root>
                                    <Section.Header>
                                        <Section.Title>
                                            Danger zone
                                        </Section.Title>
                                    </Section.Header>
                                    <Section.Body>
                                        <span>
                                            Deleting your user account will delete all your data. It will take effect
                                        </span>
                                        <DeleteUserModal
                                            triggerElement={
                                                <button
                                                    className={css({})}
                                                >
                                                    <ButtonOutlineContent
                                                        leftIcon={<IconTrash />}
                                                        text="Delete your user account"
                                                    />
                                                </button>
                                            }
                                        />
                                    </Section.Body>
                                </Section.Root>
                            </Fragment>
                        )
                    }}
                </DataWrapper>
            </Page.Body>
        </Page.Root>
    )
}