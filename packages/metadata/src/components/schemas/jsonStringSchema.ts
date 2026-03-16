import * as v from "valibot"


const maxLength = 4096 * 4

export const jsonStringSchema = v.pipe(
    v.string(),
    v.maxLength(maxLength, `Must be at most ${maxLength} characters long`),
    v.parseJson(),
)

