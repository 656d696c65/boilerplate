import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { Exception } from "../exception.js"


export async function selectMany<
    T extends PgTable<TableConfig>
>(parameters: {
    database: PostgresJsDatabase<any>
    table: T
    where?: ((table: T) => SQL<unknown> | undefined)
    limit?: number
    offset?: number
    orderBy?: ((table: T) => SQL<unknown>)
}) {
    try {
        const query = parameters.database
            .select()
            // @ts-ignore: Unreachable code error
            .from(parameters.table)
            .where(
                parameters?.where === undefined
                    ? undefined
                    : parameters.where(parameters.table)
            )


        if (parameters.limit !== undefined) {
            query.limit(parameters.limit)
        }

        if (parameters.offset !== undefined) {
            query.offset(parameters.offset)
        }

        if (parameters.orderBy !== undefined) {
            query.orderBy(parameters.orderBy(parameters.table))
        }

        const responseMany = await query

        return responseMany
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Objects not selected",
            rawError: error
        })
    }
}