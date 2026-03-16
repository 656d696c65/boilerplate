import { migrate } from "drizzle-orm/postgres-js/migrator"
import { dbClient } from "../utilities/dbClient.js"


await migrate(dbClient(), { migrationsFolder: "drizzle" })
