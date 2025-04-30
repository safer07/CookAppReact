import { StepperProps } from '../model/types'
import StepperBig from './stepper-big'
import StepperMedium from './stepper-medium'
import StepperSimple from './stepper-simple'

export default function Stepper(props: StepperProps): React.JSX.Element {
  switch (props.type) {
    case 'big':
      return <StepperBig {...props} />
    case 'medium':
      return <StepperMedium {...props} />
    case 'simple':
    default:
      return <StepperSimple {...props} />
  }
}
