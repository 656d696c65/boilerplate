import { askForUpdateEmailUserTokenRouteDefinition, consumeUpdateEmailUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
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
import { InputText } from "../../../../components/inputs/inputText"
import { sendToast } from "../../../../components/layouts/toast/sendToast"
import { fetchAPIResponse } from "../../../../utilities/fetchAPIResponse"


export function UpdateEmailForm(props: {
    triggerElement: Parameters<typeof FormModal>[0]["triggerElement"]
}) {
    return (
        <MultiStepFormModal
            title="Update Email"
            triggerElement={props.triggerElement}
            steps={[
                createStep({
                    id: "askForUpdateEmailUserToken",
                    schema: askForUpdateEmailUserTokenRouteDefinition.schemas.input,
                    defaultValues: {
                        newEmail: undefined,
                    },
                    onBack: async () => {
                        return true
                    },
                    backButtonProps: {
                        text: "Cancel"
                    },
                    onNext: async (data) => {
                        const response = await fetchAPIResponse({
                            routeDefinition: askForUpdateEmailUserTokenRouteDefinition,
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
                            <FormField
                                control={form.control}
                                name="newEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="New email"
                                            isRequired={true}
                                            description={undefined}
                                        />
                                        <InputText
                                            value={field.value}
                                            onChange={field.onChange}
                                            type="email"
                                        />
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                        </Fragment>
                    )
                }),
                createStep({
                    id: "consumeUpdateEmailUserToken",
                    schema: consumeUpdateEmailUserTokenRouteDefinition.schemas.input,
                    defaultValues: {
                        currentEmailToken: undefined,
                        newEmailToken: undefined,
                    },
                    onBack: async () => {
                        return true
                    },
                    backButtonProps: {
                        text: "Back"
                    },
                    onNext: async (data) => {
                        const response = await fetchAPIResponse({
                            routeDefinition: consumeUpdateEmailUserTokenRouteDefinition,
                            body: data,
                        })

                        if (response.success === false) {
                            sendToast({
                                type: "error",
                                description: "New email can not be validated."
                            })
                            return false
                        }

                        sendToast({
                            type: "success",
                            description: "New email is set."
                        })
                        return true
                    },
                    nextButtonProps: {
                        leftIcon: <IconSend />,
                        text: "Validate email update",
                        className: css.raw({}),
                    },
                    children: (form) => (
                        <Fragment>
                            <FormField
                                control={form.control}
                                name="currentEmailToken"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Validation code received on your old email"
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
                                name="newEmailToken"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Validation code received on the new email"
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
                        </Fragment>
                    )
                })
            ]}
        />
    )
}