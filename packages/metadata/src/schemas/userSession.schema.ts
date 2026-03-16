import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema.js'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import { userSessionModel } from '../orm/models/userSession.model.js'


export const userSessionSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idUser":
        v.nonNullable(
            idSchema
        ),

    "isActive":
        v.nonNullable(
            booleanSchema
        ),

    "token":
        v.nonNullable(
            stringSchema
        ),

    "ip":
        v.nullable(
            stringSchema
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
    v.GenericSchema<typeof userSessionModel.$inferSelect>
