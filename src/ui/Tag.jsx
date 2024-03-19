export default function Tag({ text, onClick, surface = "surface-accent" }) {
  return (
    <span
      className={`${surface} label-small rounded-full px-1.5 py-0.5`}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
