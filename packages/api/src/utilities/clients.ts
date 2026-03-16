import * as platformSchema from '@boilerplate/metadata/orm'
import { nodemailerClient } from '../clients/nodemailerClient.js'
import { postgresqlClient } from "../clients/postgresql.client.js"
import { Environment } from "./environment.js"


export class Clients {
    static platformPostgresql: ReturnType<typeof postgresqlClient>
    static nodemailer: ReturnType<typeof nodemailerClient>

    static async init() {
        this.platformPostgresql = postgresqlClient({
            url: Environment.DATABASE_URL,
            schema: platformSchema,
        })
        this.nodemailer = nodemailerClient()
    }
}