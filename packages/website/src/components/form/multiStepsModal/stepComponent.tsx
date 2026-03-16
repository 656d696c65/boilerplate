import { valibotResolver } from "@hookform/resolvers/valibot"
import { useState, type ReactElement } from "react"
import { FormProvider, useForm, type DefaultValues, type UseFormReturn } from "react-hook-form"
import * as v from "valibot"
import { css } from "../../../../styled-system/css"
import { ButtonOutlineContent } from "../../button/buttonOutlineContent"
import { ButtonPlainContent } from "../../button/buttonPlainContent"

export function createStep<
    TStepDataSchema extends v.GenericSchema<Record<string, unknown>>,
>(parameters: {
    id: string
    title?: string
    defaultValues: DefaultValues<v.InferOutput<TStepDataSchema>>
    schema: TStepDataSchema
    onBack: () => Promise<boolean>
    backButtonProps: Parameters<typeof ButtonOutlineContent>[0]
    onNext: (data: v.InferOutput<TStepDataSchema>) => Promise<boolean>
    nextButtonProps: Parameters<typeof ButtonPlainContent>[0]
    children: (form: UseFormReturn<v.InferOutput<TStepDataSchema>, any, v.InferOutput<TStepDataSchema>>) => ReactElement
}) {
    return parameters
}

export function StepComponent<
    TStepDataSchema extends v.GenericSchema<Record<string, unknown>>,
    TGlobalData extends Record<string, unknown>
>(props: {
    id: string
    title?: string
    defaultValues: DefaultValues<v.InferOutput<TStepDataSchema>>
    schema: TStepDataSchema
    globalData: TGlobalData
    onBack: () => Promise<boolean>
    backButtonProps: Parameters<typeof ButtonOutlineContent>[0]
    onNext: (data: v.InferOutput<TStepDataSchema>) => Promise<boolean>
    nextButtonProps: Parameters<typeof ButtonPlainContent>[0]
    children: (form: UseFormReturn<v.InferOutput<TStepDataSchema>, any, v.InferOutput<TStepDataSchema>>) => ReactElement
}) {
    const [isNextSubmitting, setIsNextSubmitting] = useState<boolean>(false)
    const [isBackSubmitting, setIsBackSubmitting] = useState<boolean>(false)

    const form = useForm<v.InferOutput<TStepDataSchema>>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        resolver: valibotResolver<v.InferOutput<TStepDataSchema>, any, v.InferOutput<TStepDataSchema>>(props.schema),
    })

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "start",
                gap: "0.5rem",
                borderTopWidth: "1px",
                borderTopColor: "neutral/10",
            })}
        >
            <FormProvider {...form}>
                <form
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1rem",
                        padding: "2rem",
                    })}
                >
                    {props.children(form)}
                </form>
            </FormProvider>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "start",
                    gap: "0.5rem",
                    padding: "1rem",
                    borderTopWidth: "1px",
                    borderTopColor: "neutral/10",
                })}
            >
                <button
                    type="button"
                    onClick={async (event) => {
                        setIsBackSubmitting(true)

                        const response = await props.onBack()
                        if (response === false) {
                            setIsBackSubmitting(false)
                            return
                        }

                        setIsBackSubmitting(false)
                        event.preventDefault()
                    }}
                    className={css({})}
                >
                    <ButtonOutlineContent
                        className={css.raw({})}
                        isLoading={isBackSubmitting}
                        text="Back"
                        {...props.backButtonProps}
                    />
                </button>
                <button
                    type="button"
                    onClick={async (event) => {
                        setIsNextSubmitting(true)

                        const triggerResponse = await form.trigger()
                        if (triggerResponse === false) {
                            setIsNextSubmitting(false)
                            return
                        }

                        const data = form.getValues()
                        const response = await props.onNext(data)
                        if (response === false) {
                            setIsNextSubmitting(false)
                            return
                        }

                        setIsNextSubmitting(false)
                        event.preventDefault()
                    }}
                    className={css({})}
                >
                    <ButtonPlainContent
                        className={css.raw({})}
                        isLoading={isNextSubmitting}
                        {...props.nextButtonProps}
                    />
                </button>
            </div>
        </div>
    )
}
