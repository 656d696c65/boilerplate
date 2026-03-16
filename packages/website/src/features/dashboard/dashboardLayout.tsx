import { css } from "../../../styled-system/css/css.js"

export function DashboardLayout() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
            })}
        >
            <span>auth</span>
        </div>
    )
}
