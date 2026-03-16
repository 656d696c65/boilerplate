import { userModel } from "./models/user.model.js"
import { userSessionModel } from "./models/userSession.model.js"
import { userRelations } from "./relations/user.relations.js"
import { userSessionRelations } from "./relations/userSession.relations.js"


export const models = {
    user: userModel,
    userSession: userSessionModel,
}

export const relations = {
    user: userRelations,
    userSession: userSessionRelations,
}

export const modelSchemas = {
    ...models,
    ...relations,
}
