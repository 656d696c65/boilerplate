import { relations } from "drizzle-orm"
import { userModel } from "../models/user.model.js"
import { userSessionModel } from "../models/userSession.model.js"


export const userRelations = relations(userModel, ({ one, many }) => ({
    userSessions: many(userSessionModel),
}))
