import { Outlet } from "@tanstack/react-router"
import { css } from "../../../../styled-system/css"


export function AuthLayout() {
    return (
        <div
            className={css({
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
            })}
        >
            <Outlet />
        </div>
    )
}
