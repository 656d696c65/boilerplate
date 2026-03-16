import { signInRouteDefinition } from "@boilerplate/metadata/routes"
import { IconLogin2 } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { css } from "../../../../styled-system/css"
import { FormError } from "../../../components/form/formError"
import { FormField } from "../../../components/form/formField"
import { FormItem } from "../../../components/form/formItem"
import { FormLabel } from "../../../components/form/formLabel"
import { FormRoot } from "../../../components/form/formRoot"
import { InputPassword } from "../../../components/inputs/inputPassword"
import { InputText } from "../../../components/inputs/inputText"
import { sendToast } from "../../../components/layouts/toast/sendToast"
import { rootRouter } from "../../../routes/rootRouter"
import { fetchAPIResponse } from "../../../utilities/fetchAPIResponse"


export function SignInForm() {
    return (
        <FormRoot
            schema={signInRouteDefinition.schemas.input}
            defaultValues={{
                email: undefined,
                password: undefined,
            }}
            submitButtonProps={{
                leftIcon: <IconLogin2 />,
                text: "Sign in",
                className: css.raw({
                    width: "100%",
                    justifyContent: "center",
                })
            }}
            onSubmit={async (data) => {
                const response = await fetchAPIResponse({
                    routeDefinition: signInRouteDefinition,
                    body: data,
                })
                if (response.success === false) {
                    sendToast({
                        type: "error",
                        description: "Sign in failed. Check your credentials."
                    })
                    return false
                }

                sendToast({
                    type: "success",
                    description: "Authenticated!"
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Password"
                                    isRequired={false}
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
            )}
        </FormRoot>
    )
}