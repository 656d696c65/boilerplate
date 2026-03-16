import type { Config } from "drizzle-kit"


export default {
    schema: "./src/utilities/schemas.ts",
    out: "./drizzle",
    dialect: "postgresql",
    strict: true,
    dbCredentials: {
        url: process.env["SQL_DATABASE_URL"] ?? "",
    },
    verbose: true,
} satisfies Config
