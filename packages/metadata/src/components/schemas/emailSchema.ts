import * as v from "valibot"


export const emailSchema = v.pipe(
    v.string(),
    v.email()
    // v.regex(/^[\w+-]+(?:\.[\w+-]+)*@[\da-z]+(?:[.-][\da-z]+)*\.[a-z]{2,}$/iu)
)

