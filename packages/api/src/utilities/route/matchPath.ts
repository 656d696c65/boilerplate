
export function matchPath(pattern: string, actual: string): boolean {
    const regex = new RegExp("^" + pattern.replace(/:([^/]+)/g, "([^/]+)") + "$")
    return regex.test(actual)
}