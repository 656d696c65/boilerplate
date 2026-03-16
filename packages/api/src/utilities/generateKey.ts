import { customAlphabet } from 'nanoid'


export function generateKey() {
    const raw = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 32)()
    return raw
}
