import { deleteUserRouteDefinition } from "@boilerplate/metadata/routes"
import { IconTrash } from "@tabler/icons-react"
import { css } from "../../../../../styled-system/css"
import { ConfirmationModal } from "../../../../components/form/confirmationModal"
import { sendToast } from "../../../../components/layouts/toast/sendToast"
import { rootRouter } from "../../../../routes/rootRouter"
import { fetchAPIResponse } from "../../../../utilities/fetchAPIResponse"


export function DeleteUserModal(props: {
    triggerElement: Parameters<typeof ConfirmationModal>[0]["triggerElement"]
}) {
    return (
        <ConfirmationModal
            title="Delete user"
            triggerElement={props.triggerElement}
            submitButtonProps={{
                leftIcon: <IconTrash />,
                text: "Delete",
                className: css.raw({}),
            }}
            onSubmit={async () => {
                const response = await fetchAPIResponse({
                    routeDefinition: deleteUserRouteDefinition,
                    body: {},
                })

                if (response.success === false) {
                    sendToast({
                        type: "error",
                        description: "User not deleted."
                    })
                    return false
                }

                sendToast({
                    type: "success",
                    description: "User deleted."
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                rootRouter.navigate({
                    to: "/sign-in",
                    reloadDocument: true,
                })
            }}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "1rem",
                })}
            >
                <span>
                    Are you sure you want to delete your user account?
                </span>
                <span
                    className={css({
                        fontStyle: "italic"
                    })}
                >
                    This action cannot be undone.
                </span>
            </div>
        </ConfirmationModal>
    )
}