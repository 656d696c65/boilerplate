import { signUpRouteDefinition } from "@boilerplate/metadata/routes"
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


export function SignUpForm() {
    return (
        <FormRoot
            schema={signUpRouteDefinition.schemas.input}
            defaultValues={{
                email: undefined,
                password: undefined,
            }}
            submitButtonProps={{
                leftIcon: <IconLogin2 />,
                text: "Sign up",
                className: css.raw({
                    width: "100%",
                    justifyContent: "center",
                }),
            }}
            onSubmit={async (data) => {
                if (data.password !== data.confirmPassword) {
                    sendToast({
                        type: "error",
                        description: "Password and confirm password are not the same."
                    })
                    return false
                }

                const response = await fetchAPIResponse({
                    routeDefinition: signUpRouteDefinition,
                    body: data,
                })

                if (response.success === false) {
                    sendToast({
                        type: "error",
                        description: "Sign up failed."
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Confirm password"
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