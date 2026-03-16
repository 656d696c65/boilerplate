import { valibotResolver } from "@hookform/resolvers/valibot"
import type { ReactElement } from "react"
import { type DefaultValues, FormProvider, type UseFormReturn, useForm } from "react-hook-form"
import * as v from "valibot"
import { css } from "../../../styled-system/css"
import { ButtonOutlineContent } from "../button/buttonOutlineContent"
import { ButtonPlainContent } from "../button/buttonPlainContent"


export function FormRoot<
    T extends Record<string, unknown>,
    U extends v.GenericSchema<T>
>(props: {
    schema: U
    defaultValues: DefaultValues<v.InferOutput<U>>
    onSubmit: (data: v.InferOutput<U>) => Promise<boolean>
    onCancel: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    onSuccess: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    resetOnSubmit?: boolean
    submitButtonProps: Parameters<typeof ButtonOutlineContent>[0]
    children: (form: UseFormReturn<v.InferOutput<U>, any, v.InferOutput<U>>) => ReactElement
}) {
    const form = useForm<T>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        resolver: valibotResolver<T, any, T>(props.schema),
    })

    return (
        <FormProvider {...form}>
            <form
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                })}
            //  onSubmit={}
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        {props.children(form)}
                    </div>
                    <button
                        type="button"
                        // tabIndex={}
                        onClick={async (event) => {
                            const triggerResponse = await form.trigger()
                            if (!triggerResponse) return

                            const data = form.getValues()
                            const response = await props.onSubmit(data)
                            if (!response) return

                            if (props.resetOnSubmit === true) {
                                form.reset()
                            }

                            if (props.onSuccess !== undefined) {
                                await props.onSuccess(data)
                            }

                            event.preventDefault()
                        }}
                        className={css({
                            width: "100%"
                        })}
                    >
                        <ButtonPlainContent
                            {...props.submitButtonProps}
                            className={css.raw(
                                {},
                                props.submitButtonProps.className
                            )}
                            isLoading={form.formState.isSubmitting}
                        />
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}
