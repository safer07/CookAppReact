export default function Tag({ text, surface = "surface-accent" }) {
  return (
    <span className={`${surface} label-small rounded-full px-1.5 py-0.5`}>
      {text}
    </span>
  );
}
