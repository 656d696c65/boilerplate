import { toast as sonnerToast } from 'sonner'
import { ToastComponent } from "./toastComponent"


export function sendToast(parameters: {
    type: Parameters<typeof ToastComponent>[0]["type"]
    description: Parameters<typeof ToastComponent>[0]["description"]
}) {
    const duration = {
        success: 3000,
        warning: Infinity,
        error: 6000,
    }[parameters.type]

    return sonnerToast.custom(
        (id) => (
            <ToastComponent
                id={id}
                type={parameters.type}
                description={parameters.description}
            />
        ),
        {
            duration: duration,
        }
    )
}
