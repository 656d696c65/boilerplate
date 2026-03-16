export const colors = ["primary", "error", "warning", "success", "information", "neutral"] as const

export type Colors = typeof colors[number]

export const cookiePrefix = "boilerplate"