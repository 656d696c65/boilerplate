import { cloneElement, type ReactElement, type SVGProps } from "react"
import { css, cx, type Styles } from "../../../styled-system/css"
import { CircularLoader } from "../layouts/circularLoader"



export function ButtonOutlineContent(props: {
    isLoading?: boolean
    isDisabled?: boolean
    leftIcon?: ReactElement<SVGProps<SVGSVGElement>>
    rightIcon?: ReactElement<SVGProps<SVGSVGElement>>
    text?: string
    className?: Styles
}) {

    return (
        <div
            className={cx(
                "group",
                css(
                    {
                        cursor: "pointer",
                        width: "fit-content",
                        height: "auto",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        borderRadius: "0.25rem",
                        borderWidth: "1px",
                        borderColor: "neutral/25",
                        padding: "0.5rem",
                        gap: "0.5rem",
                        _hover: {
                            backgroundColor: "neutral/5",
                        },
                    },
                    props.className,
                )
            )}
        >
            {
                (props.isLoading === true)
                    ? (
                        <CircularLoader
                            className={css.raw({
                                color: "neutral"
                            })}
                        />
                    )
                    : (props.leftIcon === undefined)
                        ? (null)
                        : (
                            cloneElement(props.leftIcon, {
                                className: css(
                                    {
                                        strokeWidth: "1.5px",
                                        minWidth: "1rem",
                                        width: "1rem",
                                        maxWidth: "1rem",
                                        minHeight: "1rem",
                                        height: "1rem",
                                        maxHeight: "1rem",
                                        color: "neutral"
                                    },
                                ),
                            })
                        )
            }
            {
                (props.text === undefined)
                    ? (null)
                    : (
                        <span
                            className={css(
                                {
                                    fontSize: "1rem",
                                    fontWeight: "300",
                                    lineHeight: "1rem",
                                    whiteSpace: "nowrap",
                                    color: "neutral",
                                    _groupHover: {
                                        // textDecoration: "underline"
                                    }
                                },
                            )}
                        >
                            {props.text}
                        </span>
                    )
            }
            {
                (props.rightIcon === undefined)
                    ? (null)
                    : (
                        cloneElement(props.rightIcon, {
                            className: css(
                                {
                                    marginLeft: "auto",
                                    strokeWidth: "1.5px",
                                    minWidth: "1rem",
                                    width: "1rem",
                                    maxWidth: "1rem",
                                    minHeight: "1rem",
                                    height: "1rem",
                                    maxHeight: "1rem",
                                    color: "neutral"
                                },
                            ),
                        })
                    )
            }
        </div>
    )
}
