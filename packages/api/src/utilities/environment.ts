import * as v from "valibot"
import { validate } from "./validate.js"


export class Environment {
    static ENV: string
    static VERBOSE: string
    static PORT: string

    static CORS_ORIGIN: string
    static COOKIES_DOMAIN: string
    static COOKIES_KEY: string

    static API_BASE_URL: string
    static WEBSITE_BASE_URL: string

    static SQL_DATABASE_URL: string

    static async init() {
        const parsedEnvironment = validate({
            schema: v.object({
                ENV: v.picklist(["development", "production"]),
                VERBOSE: v.picklist(["true", "false"]),
                PORT: v.string(),

                CORS_ORIGIN: v.string(),
                COOKIES_DOMAIN: v.string(),
                COOKIES_KEY: v.string(),

                API_BASE_URL: v.string(),
                WEBSITE_BASE_URL: v.string(),

                SQL_DATABASE_URL: v.string(),
            }),
            data: process.env,
        })

        Object.assign(this, parsedEnvironment)
    }
}