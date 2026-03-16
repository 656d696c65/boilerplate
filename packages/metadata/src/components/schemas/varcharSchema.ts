import * as v from "valibot"


export function varcharSchema(parameters: {
    maxLength: number
}) {
    return v.pipe(
        v.string("Must be a string"),
        v.maxLength(parameters.maxLength, `Must be at most ${parameters.maxLength} characters long`),
    )
} 
