import { relations } from "drizzle-orm"
import { userSessionModel, userTokenModel } from "../models.index.js"
import { userModel } from "../models/user.model.js"


export const userRelations = relations(userModel, ({ one, many }) => ({
    userSessions: many(userSessionModel),
    userTokens: many(userTokenModel),
}))
