import { jsonb } from "drizzle-orm/pg-core"


export function stringArrayColumn(id: string) {
    return jsonb(id)
        .$type<Array<string>>()
}
