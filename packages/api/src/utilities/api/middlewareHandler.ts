import type { BaseContext } from "./baseContext.js"


export async function middlewareHandler<
    TContextIn extends BaseContext,
    TContextOut = BaseContext,
>(parameters: {
    context: TContextIn
    handler: (parameters: { context: TContextIn }) => Promise<TContextOut>
}) {
    const newContext = await parameters.handler({
        context: parameters.context
    })
    return newContext
}
