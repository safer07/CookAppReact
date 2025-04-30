type RadioProps = {
  checked: boolean
}

export default function Radio({ checked }: RadioProps) {
  return <input className="radio" type="radio" checked={checked} readOnly />
}
