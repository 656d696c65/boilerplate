import { relations } from "drizzle-orm"
import { userModel } from "../models/user.model.js"
import { userSessionModel } from "../models/userSession.model.js"


export const userSessionRelations = relations(userSessionModel, ({ one, many }) => ({
    user: one(userModel, {
        fields: [userSessionModel.idUser],
        references: [userModel.id],
    }),
}))
