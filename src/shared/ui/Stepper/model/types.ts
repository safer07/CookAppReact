type BaseProps = {
  stepsCount: number
  currentIndex: number
}

export type StepperSimpleProps = {
  type?: 'simple'
} & BaseProps

export type StepperMediumProps = {
  type: 'medium'
  setStep: (index: number) => void
} & BaseProps

export type StepperBigProps = {
  type: 'big'
  setStep: (index: number) => void
  createStep: () => void
} & BaseProps

export type StepperProps = StepperSimpleProps | StepperMediumProps | StepperBigProps
