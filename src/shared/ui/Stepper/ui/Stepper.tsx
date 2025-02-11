import { StepperProps } from '../model/types'
import StepperBig from './StepperBig'
import StepperMedium from './StepperMedium'
import StepperSimple from './StepperSimple'

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
