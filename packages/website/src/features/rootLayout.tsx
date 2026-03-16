import { Outlet } from "@tanstack/react-router"
import { css } from "../../styled-system/css"


export function RootLayout() {
    return (
        <div
            className={css({
                position: "relative",
                minHeight: "100dvh",
                height: "100dvh",
                width: "100dvw",
                maxWidth: "100dvw",
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
            })}
        >
            <Outlet />
        </div >
    )
}
