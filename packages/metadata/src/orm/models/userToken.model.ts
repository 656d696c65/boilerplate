import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { userTokenTypeEnum } from "../enums/userTokenType.enum.js"
import { userModel } from "./user.model.js"


export const userTokenModel = pgTable(
    "table_user_token",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idUser:
            idColumn("id_user")
                .references(() => userModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        type:
            userTokenTypeEnum("type")
                .notNull(),

        value:
            text("value")
                .notNull(),

        email:
            text("email")
                .notNull(),

        isConsumed:
            boolean("is_consumed")
                .notNull(),

        expiresAt:
            timestampColumn("expires_at")
                .notNull(),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.type),
        index().on(t.value),
    ])
)