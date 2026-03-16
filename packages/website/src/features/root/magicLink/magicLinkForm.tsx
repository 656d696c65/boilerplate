import { askForMagicLinkUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { IconSend } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { css } from "../../../../styled-system/css"
import { FormError } from "../../../components/form/formError"
import { FormField } from "../../../components/form/formField"
import { FormItem } from "../../../components/form/formItem"
import { FormLabel } from "../../../components/form/formLabel"
import { FormRoot } from "../../../components/form/formRoot"
import { InputText } from "../../../components/inputs/inputText"
import { sendToast } from "../../../components/layouts/toast/sendToast"
import { fetchAPIResponse } from "../../../utilities/fetchAPIResponse"


export function MagicLinkForm() {
    return (
        <FormRoot
            schema={askForMagicLinkUserTokenRouteDefinition.schemas.input}
            defaultValues={{
                email: undefined,
            }}
            submitButtonProps={{
                leftIcon: <IconSend />,
                text: "Receive magic link",
                className: css.raw({
                    width: "100%",
                    justifyContent: "center",
                })
            }}
            onSubmit={async (data) => {
                const response = await fetchAPIResponse({
                    routeDefinition: askForMagicLinkUserTokenRouteDefinition,
                    body: data,
                })
                if (response.success === false) {
                    sendToast({
                        type: "error",
                        description: "Magic link can't be sent."
                    })
                    return false
                }
                return true
            }}
            onCancel={undefined}
            onSuccess={() => {
                sendToast({
                    type: "success",
                    description: "Check your emails (if the account exists)"
                })
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Email"
                                    isRequired={false}
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
            )}
        </FormRoot>
    )
}