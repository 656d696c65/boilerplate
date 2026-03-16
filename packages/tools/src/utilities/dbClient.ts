import * as platformSchema from '@boilerplate/metadata/orm'
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from './env.js'


export function dbClient() {
    try {
        const queryClient = postgres(env()?.SQL_DATABASE_URL ?? "")
        const drizzleClient = drizzle(
            queryClient,
            {
                schema: platformSchema
            }
        )
        return drizzleClient
    }
    catch (error) {
        throw new Error("PostgreSQL client not available")
    }
}