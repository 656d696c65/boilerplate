
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconX } from '@tabler/icons-react'
import { toast as sonnerToast } from 'sonner'
import { sva } from '../../../../styled-system/css'
import { ButtonGhostContent } from '../../button/buttonGhostContent'


export function ToastComponent(props: {
  id: string | number
  type: "success" | "error" | "warning"
  description: string
}
) {
  const Icon = {
    success: IconCircleCheck,
    error: IconAlertHexagon,
    warning: IconAlertTriangle,
  }[props.type]

  const title = {
    success: "Success",
    warning: "Warning",
    error: "Error",
  }[props.type]

  const toastRecipe = sva({
    slots: ["container", "header", "icon", "title", "close", "body", "description",],
    base: {
      container: {
        minWidth: "100%",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        borderRadius: "0.5rem",
        borderWidth: "1px",
        borderLeftWidth: "4px",
        borderStyle: "solid",
        backgroundColor: "white",
        boxShadow: "lg",
        md: {
          minWidth: "32rem",
          width: "32rem",
          maxWidth: "32rem",
        }
      },
      header: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "0.5rem",
        borderBottomWidth: "1px",
        padding: "1rem",
      },
      icon: {
        strokeWidth: "1.5px",
      },
      title: {
        fontWeight: "normal",
      },
      close: {
        marginLeft: "auto",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        padding: "1rem",
      },
      description: {

      }
    },
    variants: {
      type: {
        success: {
          container: {
            borderColor: "green/25",
            borderLeftColor: "green/75",
          },
          header: {
            backgroundColor: "green/5",
            borderBottomColor: "green/25",
          },
          icon: {
            stroke: "green"
          },
          title: {
            color: "green",
          },
          body: {},
          description: {}
        },
        warning: {
          container: {
            borderColor: "orange/25",
            borderLeftColor: "orange/75",
          },
          header: {
            backgroundColor: "orange/5",
            borderBottomColor: "orange/25",
          },
          icon: {
            stroke: "orange"
          },
          title: {
            color: "orange",
          },
          body: {},
          description: {}
        },
        error: {
          container: {
            borderColor: "red/25",
            borderLeftColor: "red/75",
          },
          header: {
            backgroundColor: "red/5",
            borderBottomColor: "red/25",
          },
          icon: {
            stroke: "red"
          },
          title: {
            color: "red",
          },
          body: {},
          description: {}
        },
      },
    },
  })

  const toastSlots = toastRecipe({
    type: props.type,
  })

  return (
    <div
      className={toastSlots.container}
    >
      <div
        className={toastSlots.header}
      >
        <Icon
          size={24}
          className={toastSlots.icon}
        />
        <span
          className={toastSlots.title}
        >
          {title}
        </span>
        <button
          className={toastSlots.close}
          onClick={() => {
            sonnerToast.dismiss(props.id)
          }}
        >
          <ButtonGhostContent
            leftIcon={<IconX />}
          />
        </button>
      </div>
      <div
        className={toastSlots.body}
      >
        <span
          className={toastSlots.description}
        >
          {props.description}
        </span>
      </div>
    </div>
  )
}
