import { relations } from "drizzle-orm"
import { userModel, userSessionModel } from "../models.index.js"


export const userSessionRelations = relations(userSessionModel, ({ one, many }) => ({
    user: one(userModel, {
        fields: [userSessionModel.idUser],
        references: [userModel.id],
    }),
}))
