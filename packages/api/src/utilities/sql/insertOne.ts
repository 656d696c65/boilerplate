import type { TableConfig } from "drizzle-orm"
import type { PgInsertValue, PgTable } from "drizzle-orm/pg-core"
import { Exception } from "../exception.js"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"


export async function insertOne<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    data: PgInsertValue<T>
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database
            .insert(parameters.table)
            .values(parameters.data)
            .returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                internalMessage: "Object not inserted",
                cause: "Object not found",
            })
        }

        return responseOne
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Object not inserted",
            rawError: error
        })
    }
}