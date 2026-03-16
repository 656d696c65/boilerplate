import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { userModel } from "./user.model.js"


export const userSessionModel = pgTable(
    "table_user_session",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idUser:
            idColumn("id_user")
                .references(() => userModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        isActive:
            boolean("is_active")
                .notNull(),

        token:
            text("token")
                .notNull(),

        ip:
            text("ip"),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.idUser),
        index().on(t.token),
    ])
)