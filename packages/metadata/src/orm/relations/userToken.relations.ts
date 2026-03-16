import { relations } from "drizzle-orm"
import { userModel, userTokenModel } from "../models.index.js"


export const userTokenRelations = relations(userTokenModel, ({ one, many }) => ({
    user: one(userModel, {
        fields: [userTokenModel.idUser],
        references: [userModel.id],
    }),
}))
