import { customAlphabet } from 'nanoid'


export function generateToken() {
    const raw = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)()
    return raw
}
