import { cloneElement, type ReactElement, type SVGProps } from "react"
import { css, cx, type Styles } from "../../../styled-system/css"


export function LinkButtonContent(props: {
    leftIcon?: ReactElement<SVGProps<SVGSVGElement>>
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
                        gap: "0.5rem",
                    },
                    props.className,
                )
            )}
        >
            {
                (props.leftIcon === undefined)
                    ? (null)
                    : (
                        cloneElement(props.leftIcon, {
                            className: css(
                                {
                                    strokeWidth: "1.5px",
                                    minWidth: "1rem",
                                    width: "1rem",
                                    minHeight: "1rem",
                                    height: "1rem",
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
                                    textDecoration: "underline",
                                    _groupHover: {
                                        color: "neutral/75",
                                        textDecoration: "none",
                                    }
                                },
                            )}
                        >
                            {props.text}
                        </span>
                    )
            }
        </div>
    )
}
