import { IconWand } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { css } from "../../../../styled-system/css";
import { ButtonOutlineContent } from "../../../components/button/buttonOutlineContent";
import { Beta } from "../../../components/layouts/beta";
import { Logo } from "../../../components/layouts/logo";
import { SignInForm } from "./signInForm";


export function SignInPage() {
    return (
        <div
            className={css({
                height: "fit-content",
                overflow: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                margin: "auto",
                padding: "1rem",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "md",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "2rem",
                    padding: "2rem",
                    borderColor: "neutral/50",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    borderRadius: "0.5rem",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderBottomColor: "neutral/50",
                        borderBottomStyle: "dashed",
                        borderBottomWidth: "1px",
                        paddingBottom: "2rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.25rem",
                        })}
                    >
                        <Logo />
                        <Beta />
                    </div>
                    <span
                        className={css({
                            fontSize: "1rem",
                            color: "neutral/75",
                        })}
                    >
                        Welcome back!
                    </span>
                </div>
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "md",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    <SignInForm />
                </div>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.25rem",
                        borderTopColor: "neutral/50",
                        borderTopStyle: "dashed",
                        borderTopWidth: "1px",
                        paddingTop: "2rem",
                    })}
                >
                    <Link
                        to="/magic-link"
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonOutlineContent
                            leftIcon={<IconWand />}
                            text="Switch to magic link"
                            className={{
                                width: "100%",
                                justifyContent: "center",
                            }}
                        />
                    </Link>
                    <Link
                        to="/sign-up"
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonOutlineContent
                            text="Don't have an account? Sign up"
                            className={{
                                width: "100%",
                                justifyContent: "center",
                            }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}