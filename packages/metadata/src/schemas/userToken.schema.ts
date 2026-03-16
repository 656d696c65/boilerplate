import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema.js'
import { emailSchema } from '../components/schemas/emailSchema.js'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import { userTokenType } from '../components/values/userTokenType.js'
import type { userTokenModel } from '../orm.index.js'


export const userTokenSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idUser":
        v.nonNullable(
            idSchema
        ),

    "type":
        v.nonNullable(
            v.picklist(userTokenType)
        ),

    "value":
        v.nonNullable(
            stringSchema
        ),

    "email":
        v.nonNullable(
            emailSchema
        ),

    "isConsumed":
        v.nonNullable(
            booleanSchema
        ),

    "expiresAt":
        v.nonNullable(
            timestampSchema
        ),

    "lastUpdatedAt":
        v.nullable(
            timestampSchema
        ),

    "createdAt":
        v.nonNullable(
            timestampSchema
        ),

}) satisfies
    v.GenericSchema<typeof userTokenModel.$inferSelect>
