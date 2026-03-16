import type { routeDefinition } from "@boilerplate/metadata/utilities"
import { Fragment, useMemo, type ComponentProps, type ReactElement } from "react"
import * as v from "valibot"
import { css } from "../../../styled-system/css"
import { useAPIData } from "../../utilities/useAPIData"
import { CircularLoader } from "../layouts/circularLoader"
import { FormatError } from "./formatError"


export function DataWrapper<
    TSchemaInput extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaOutput extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(props: {
    routeDefinition: ReturnType<typeof routeDefinition<
        string,
        TSchemaInput,
        TSchemaOutput
    >>
    body: v.InferInput<TSchemaInput>
    children: (data: v.InferOutput<TSchemaOutput>) => ReactElement | Array<ReactElement> | null
    className?: ComponentProps<'div'>['className']
    loaderProps?: ComponentProps<typeof CircularLoader>
    errorProps?: ComponentProps<typeof FormatError>
}) {
    const response = useAPIData({
        routeDefinition: props.routeDefinition,
        body: props.body,
    })
    const key = useMemo(() => crypto.randomUUID(), [response.data])

    if (response.data === undefined) {
        if (response.isPending) {
            return (
                <CircularLoader
                    {...props.loaderProps}
                    text={props.loaderProps?.text}
                    className={css.raw(
                        {},
                        props.loaderProps?.className,
                    )}
                />
            )
        }
        return (
            <FormatError
                {...props.errorProps}
                text={props.errorProps?.text ?? "Error loading data"}
                className={css.raw({
                    padding: "1rem",
                })}
            />
        )
    }

    return (
        <Fragment key={key}>
            {props.children(response.data)}
        </Fragment>
    )
}
