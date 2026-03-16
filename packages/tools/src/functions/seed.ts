import { userModel } from '@boilerplate/metadata/orm'
import { generateId } from "@boilerplate/metadata/utilities"
import { pbkdf2Sync, randomBytes } from "crypto"
import { dbClient } from '../utilities/dbClient.js'


async function seed() {
    try {
        await dbClient().transaction(async (tx) => {


            // User
            console.log("Add user")
            const passwordSalt = randomBytes(16).toString('hex')
            const passwordHash = pbkdf2Sync("demo", passwordSalt, 128000, 64, `sha512`).toString(`hex`)
            const newUser: (typeof userModel.$inferInsert) = {
                id: generateId(),
                isArchived: false,
                isActive: true,
                email: "demo@boilerplate.com",
                passwordHash: passwordHash,
                passwordSalt: passwordSalt,
                createdAt: new Date().toISOString(),
            }
            await tx.insert(userModel).values(newUser)


        })

    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()
