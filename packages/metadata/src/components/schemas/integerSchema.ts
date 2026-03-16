import * as v from "valibot"

export const integerSchema = v.pipe(
    v.number(),
    v.integer("Must be integer")
)
