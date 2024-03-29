export default function Button({ text, onClick, className, type, block }) {
  let typeSlyle;

  switch (type) {
    case "primary":
      typeSlyle = "button-primary";
      break;
    default:
      typeSlyle = "button-secondary";
  }

  return (
    <button
      className={`button ${typeSlyle} ${className} ${block ? "w-full" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
