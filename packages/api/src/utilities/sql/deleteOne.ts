import type { SQL } from "drizzle-orm"
import { PgTable, type TableConfig } from "drizzle-orm/pg-core"
import { Exception } from "../exception.js"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"


// type Model = typeof models[keyof typeof models]
// type Model = PgTableWithColumns<TableConfig>

export async function deleteOne<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database
            .delete(parameters.table)
            .where(
                (parameters.where === undefined)
                    ? undefined
                    : parameters.where(parameters.table)
            )
            .returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                internalMessage: "Object not deleted",
                cause: "Object not found",
            })
        }

        return responseOne
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error deleting one",
            rawError: error
        })
    }
}