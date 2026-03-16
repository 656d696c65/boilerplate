import type { TableConfig } from "drizzle-orm"
import type { PgInsertValue, PgTable } from "drizzle-orm/pg-core"
import type { dbClient } from "./dbClient.js"


export async function insertMany<
    T extends PgTable<TableConfig>
>(parameters: {
    database: ReturnType<typeof dbClient> | Parameters<Parameters<ReturnType<typeof dbClient>["transaction"]>[0]>[0]
    table: T
    data: Array<PgInsertValue<T>>
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database
            .insert(parameters.table)
            .values(parameters.data)
            .returning()

        return responseMany
    }
    catch (error: unknown) {
        throw error
    }
}