import { modelSchemas } from '@boilerplate/metadata/orm'
import { postgresqlClient } from "../clients/postgresql.client.js"
import { Environment } from "./environment.js"


export class Clients {
    static platformPostgresql: ReturnType<typeof postgresqlClient>

    static async init() {
        this.platformPostgresql = postgresqlClient({
            url: Environment.SQL_DATABASE_URL,
            schema: modelSchemas,
        })
    }
}