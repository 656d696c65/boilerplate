import { timestamp } from "drizzle-orm/pg-core"


export function timestampColumn(id: string) {
    return timestamp(id, { mode: "string", withTimezone: true, precision: 0 })
}
