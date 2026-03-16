import JsonView from '@uiw/react-json-view'
import { css, type Styles } from "../../../styled-system/css"


export function RenderJSON(props: {
    className?: Styles
    value: object | undefined
}) {
    return (
        <JsonView
            className={css(props.className)}
            value={props.value}
            displayDataTypes={false}
        />
    )
}
