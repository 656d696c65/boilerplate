import { askForUpdatePasswordUserTokenRouteDefinition, consumeUpdatePasswordUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { IconSend } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { css } from "../../../../../styled-system/css"
import { FormError } from "../../../../components/form/formError"
import { FormField } from "../../../../components/form/formField"
import { FormItem } from "../../../../components/form/formItem"
import { FormLabel } from "../../../../components/form/formLabel"
import { FormModal } from "../../../../components/form/formModal"
import { MultiStepFormModal } from "../../../../components/form/multiStepsModal/multiStepsFormModal"
import { createStep } from "../../../../components/form/multiStepsModal/stepComponent"
import { InputPassword } from "../../../../components/inputs/inputPassword"
import { InputText } from "../../../../components/inputs/inputText"
import { sendToast } from "../../../../components/layouts/toast/sendToast"
import { fetchAPIResponse } from "../../../../utilities/fetchAPIResponse"


export function UpdatePasswordForm(props: {
    triggerElement: Parameters<typeof FormModal>[0]["triggerElement"]
}) {
    return (
        <MultiStepFormModal
            title="Update Password"
            triggerElement={props.triggerElement}
            steps={[
                createStep({
                    id: "askForUpdatePasswordUserToken",
                    schema: askForUpdatePasswordUserTokenRouteDefinition.schemas.input,
                    defaultValues: {},
                    onBack: async () => {
                        return true
                    },
                    backButtonProps: {
                        text: "Cancel"
                    },
                    onNext: async (data) => {
                        const response = await fetchAPIResponse({
                            routeDefinition: askForUpdatePasswordUserTokenRouteDefinition,
                            body: data,
                        })

                        if (response.success === false) {
                            sendToast({
                                type: "error",
                                description: "Validation code email not sent."
                            })
                            return false
                        }

                        sendToast({
                            type: "success",
                            description: "Validation code email sent."
                        })
                        return true
                    },
                    nextButtonProps: {
                        leftIcon: <IconSend />,
                        text: "Send validation code email",
                        className: css.raw({}),
                    },
                    children: (form) => (
                        <Fragment>
                            <FormLabel
                                label="Send a validation code to your current email address"
                                isRequired={false}
                                description={undefined}
                            />
                        </Fragment>
                    )
                }),
                createStep({
                    id: "consumeUpdatePasswordUserToken",
                    schema: consumeUpdatePasswordUserTokenRouteDefinition.schemas.input,
                    defaultValues: {
                        passwordToken: undefined,
                        newPassword: undefined,
                    },
                    onBack: async () => {
                        return true
                    },
                    backButtonProps: {
                        text: "Back"
                    },
                    onNext: async (data) => {
                        if (data.newPassword !== data.confirmNewPassword) {
                            sendToast({
                                type: "error",
                                description: "New password and confirm new password are not the same."
                            })
                            return false
                        }

                        const response = await fetchAPIResponse({
                            routeDefinition: consumeUpdatePasswordUserTokenRouteDefinition,
                            body: data,
                        })

                        if (response.success === false) {
                            sendToast({
                                type: "error",
                                description: "New password can not be set."
                            })
                            return false
                        }

                        sendToast({
                            type: "success",
                            description: "New password is set."
                        })
                        return true
                    },
                    nextButtonProps: {
                        leftIcon: <IconSend />,
                        text: "Update the password",
                        className: css.raw({}),
                    },
                    children: (form) => (
                        <Fragment>
                            <FormField
                                control={form.control}
                                name="passwordToken"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Validation code received on your email"
                                            isRequired={true}
                                            description={undefined}
                                        />
                                        <InputText
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="New password"
                                            isRequired={true}
                                            description={undefined}
                                        />
                                        <InputPassword
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Confirm new password"
                                            isRequired={true}
                                            description={undefined}
                                        />
                                        <InputPassword
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                        </Fragment>
                    )
                })
            ]}
        />
    )
}