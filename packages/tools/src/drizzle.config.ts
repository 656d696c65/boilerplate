import type { Config } from "drizzle-kit"
import { env } from "./utilities/env.js"


export default {
    schema: "./src/schemas.ts",
    out: "./drizzle",
    dialect: "postgresql",
    strict: true,
    dbCredentials: {
        url: env()?.DATABASE_URL ?? "",
    },
    verbose: true,
} satisfies Config
