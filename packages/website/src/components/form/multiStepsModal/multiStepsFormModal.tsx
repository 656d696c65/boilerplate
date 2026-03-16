// MultiStep.tsx
import { IconX } from "@tabler/icons-react"
import { cloneElement, Fragment, useState, type ButtonHTMLAttributes, type ReactElement } from "react"
import { createPortal } from "react-dom"
import { css } from "../../../../styled-system/css"
import { ButtonGhostContent } from "../../button/buttonGhostContent"
import { createStep, StepComponent } from "./stepComponent"


export function MultiStepFormModal<
    TSteps extends readonly ReturnType<typeof createStep<any>>[]
>(props: {
    triggerElement: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
    title?: string
    steps: TSteps
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const currentStep = props.steps[index]

    const [masterData, setMasterData] = useState<Record<string, unknown>>(props.steps.reduce<Record<string, number>>((acc, item) => {
        acc[item.id] = item.defaultValues
        return acc
    }, {}))

    return (
        <Fragment>
            {/* Render trigger button */}
            {
                cloneElement(
                    props.triggerElement,
                    {
                        onClick: () => {
                            setIsOpen(true)
                        }
                    }
                )
            }

            {/* Modal */}
            {(isOpen === false)
                ? (null)
                : (
                    createPortal(
                        <div
                            id="modal"
                            className={css({
                                position: "fixed",
                                zIndex: 50,
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "neutral/25",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "1rem",
                                md: {
                                    padding: "4rem",
                                }
                            })}
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            <div
                                className={css({
                                    borderWidth: "1px",
                                    borderColor: "neutral/20",
                                    borderRadius: "0.5rem",
                                    boxShadow: "lg",
                                    overflow: "auto",
                                    width: "100%",
                                    maxWidth: "lg",
                                    maxHeight: "100%",
                                    backgroundColor: "white",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "start",
                                    alignItems: "start",
                                })}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-title"
                            >
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "1rem",
                                        borderBottomWidth: "1px",
                                        borderBottomColor: "neutral/10",
                                        backgroundColor: "neutral/5",
                                    })}
                                >
                                    <span>
                                        {props.title}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                        }}
                                        className={css({
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        })}
                                    >
                                        <ButtonGhostContent
                                            leftIcon={<IconX />}
                                        />
                                    </button>
                                </div>
                                <StepComponent
                                    key={currentStep.id}
                                    id={currentStep.id}
                                    schema={currentStep.schema}
                                    defaultValues={masterData[currentStep.id]}
                                    onBack={async () => {
                                        if (index > 0) setIndex(i => i - 1)
                                        return await currentStep.onBack()
                                    }}
                                    backButtonProps={currentStep.backButtonProps}
                                    onNext={async (data) => {
                                        const response = await currentStep.onNext(data)

                                        if (response === false) {
                                            return false
                                        }

                                        setMasterData(prev => ({ ...prev, [currentStep.id]: data }))
                                        if (index < props.steps.length - 1) {
                                            setIndex(i => i + 1)
                                        }
                                        else {
                                            setIsOpen(false)
                                        }

                                        return true
                                    }}
                                    nextButtonProps={currentStep.nextButtonProps}
                                    globalData={masterData}
                                    children={(form) => currentStep.children(form)}
                                />
                            </div>
                        </div>,
                        document.body
                    )
                )}
        </Fragment>
    )
    //   // Render organigram
    //   const renderStepsBar = () => (
    //         <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
    //             {props.children.map((step, idx) => (
    //                 <div key={step.props.id} style={{
    //                     flex: 1,
    //                     height: 4,
    //                     backgroundColor: idx <= currentStepIndex ? "blue" : "lightgray"
    //                 }} />
    //             ))}
    //         </div>
    //     )

    //     return (
    //         <div>
    //             {renderStepsBar()}
    //             {React.cloneElement(currentStep, {
    //                 globalData: masterData,
    //                 onNext: handleNext,
    //                 onBack: currentStepIndex > 0 ? handleBack : undefined
    //             })}
    //         </div>
    //     )
}
