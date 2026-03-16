import type { TableConfig } from "drizzle-orm"
import type { PgInsertValue, PgTable } from "drizzle-orm/pg-core"
import { Exception } from "../exception.js"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"


export async function insertMany<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    data: Array<PgInsertValue<T>>
}): Promise<Array<T["$inferInsert"]>> {
    try {
        const responseMany = await parameters.database
            .insert(parameters.table)
            .values(parameters.data)
            .returning()

        return responseMany
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Objects not inserted",
            rawError: error
        })
    }
}