export default function ListItem({ size, text, secondaryText }) {
  return (
    <li className="flex items-center gap-2 px-[--body-padding-inline]">
      <span className={`${size === "tiny" ? "my-1" : "my-2"} flex grow`}>
        {text}
      </span>
      {secondaryText && (
        <span className="w-[4.5rem] text-right text-secondary-color">
          {secondaryText}
        </span>
      )}
    </li>
  );
}
