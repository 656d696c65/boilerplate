import * as v from "valibot"


export const numericSchema = v.pipe(
    v.string(),
    v.decimal()
)
