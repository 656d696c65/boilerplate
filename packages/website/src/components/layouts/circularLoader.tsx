import { IconLoader2 } from "@tabler/icons-react"
import { css, type Styles } from "../../../styled-system/css"


export function CircularLoader(props: {
    text?: string
    size?: number
    className?: Styles
}) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5rem",
                overflow: "hidden",
            })}
        >
            <IconLoader2
                className={css(
                    {
                        transformOrigin: "center",
                        animation: "spin",
                        stroke: "neutral",
                        strokeWidth: "1.5px",
                        minWidth: "1rem",
                        width: "1rem",
                        maxWidth: "1rem",
                        minHeight: "1rem",
                        height: "1rem",
                        maxHeight: "1rem",
                        color: "neutral"
                    },
                    props.className,
                )}
            />
            {
                (props.text === undefined)
                    ? (null)
                    : (
                        <span className="text-xs leading-none text-neutral/25 italic whitespace-nowrap">
                            {props.text}
                        </span>
                    )
            }
        </div>
    )
}
