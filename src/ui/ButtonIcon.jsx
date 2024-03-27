export default function ButtonIcon({ icon, onClick, className }) {
  return (
    <button className={`button-icon ${className}`} onClick={onClick}>
      <svg>
        <use href={icon} />
      </svg>
    </button>
  );
}
