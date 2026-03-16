import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from "postgres"
import { Exception } from "../utilities/exception.js"


export function postgresqlClient(parameters: {
    url: string
    schema: Record<string, unknown>
}) {
    try {
        const queryClient = postgres(parameters.url)
        const drizzleClient = drizzle(
            queryClient,
            {
                schema: parameters.schema
            }
        )
        return drizzleClient
    }
    catch (error) {
        throw new Exception({
            internalMessage: "PostgreSQL client not available",
            rawError: error,
        })
    }
}