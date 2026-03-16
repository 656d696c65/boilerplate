
export function setCookie(key: string, value?: string) {
    document.cookie = [
        `${key}=${value ?? ""}`,
        "path=/",
        // "max-age=86400",
        // "SameSite=Lax",
        // "Secure"
    ].join("; ")
}
