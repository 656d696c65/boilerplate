import { pgEnum } from "drizzle-orm/pg-core"
import { userTokenType } from "../../components/values/userTokenType.js"


export const userTokenTypeEnum = pgEnum("enum_user_token_type", userTokenType)
