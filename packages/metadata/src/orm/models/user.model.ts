import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"


export const userModel = pgTable(
    "table_user",
    {
        id:
            idColumn("id")
                .primaryKey(),

        isArchived:
            boolean("is_archived")
                .notNull(),

        isActive:
            boolean("is_active")
                .notNull(),

        email:
            text("email")
                .notNull()
                .unique(),

        passwordHash:
            text("password_hash")
                .notNull(),

        passwordSalt:
            text("password_salt")
                .notNull(),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.email),
    ])
)