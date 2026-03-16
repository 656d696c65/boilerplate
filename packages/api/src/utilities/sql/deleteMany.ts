import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { Exception } from "../exception.js"


export async function deleteMany<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .delete(parameters.table)
            .where(
                (parameters.where === undefined)
                    ? undefined
                    : parameters.where(parameters.table)
            )
            .returning()

        return responseMany
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error deleting many",
            rawError: error
        })
    }
}