import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { Exception } from "../exception.js"


export async function update<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    data: PgUpdateSetSource<T>
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .update(parameters.table)
            .set(parameters.data)
            .where(
                (parameters.where === undefined)
                    ? undefined
                    : parameters.where(parameters.table)
            )
            .returning()


        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                internalMessage: "Object not updated",
                cause: "Oject not found",
            })
        }

        return responseOne
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Oject not updated",
            rawError: error
        })
    }
}