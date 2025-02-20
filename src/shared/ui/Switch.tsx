type SwitchProps = {
  checked: boolean
  onClick: () => void
}

export default function Switch({ checked, onClick }: SwitchProps) {
  return <input className="switch" type="checkbox" checked={checked} onClick={onClick} readOnly />
}
