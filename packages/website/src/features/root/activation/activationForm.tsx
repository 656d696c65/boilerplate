import { consumeActivationUserTokenRouteDefinition } from "@boilerplate/metadata/routes"
import { IconChecks } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { css } from "../../../../styled-system/css"
import { FormError } from "../../../components/form/formError"
import { FormField } from "../../../components/form/formField"
import { FormItem } from "../../../components/form/formItem"
import { FormLabel } from "../../../components/form/formLabel"
import { FormRoot } from "../../../components/form/formRoot"
import { InputText } from "../../../components/inputs/inputText"
import { sendToast } from "../../../components/layouts/toast/sendToast"
import { rootRouter } from "../../../routes/rootRouter"
import { fetchAPIResponse } from "../../../utilities/fetchAPIResponse"


export function ActivationForm() {
    return (
        <FormRoot
            schema={consumeActivationUserTokenRouteDefinition.schemas.input}
            defaultValues={{
                activationToken: undefined,
            }}
            submitButtonProps={{
                leftIcon: <IconChecks />,
                text: "Activate",
                className: css.raw({
                    width: "100%",
                    justifyContent: "center",
                })
            }}
            onSubmit={async (data) => {
                const response = await fetchAPIResponse({
                    routeDefinition: consumeActivationUserTokenRouteDefinition,
                    body: data,
                })
                if (response.success === false) {
                    sendToast({
                        type: "error",
                        description: "Invalid activation code.",
                    })
                    return false
                }

                sendToast({
                    type: "success",
                    description: "Account activated.",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={() => {
                rootRouter.navigate({
                    to: "/",
                    reloadDocument: true,
                })
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="activationToken"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Activation code"
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
            )}
        </FormRoot>
    )
}