import { customAlphabet } from 'nanoid'


export function generateId() {
    const raw = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 16)()
    return raw
}
