export type TypeTagSurface =
  | "surface-accent"
  | "surface-green"
  | "surface-yellow"
  | "surface-red";

type TagProps = {
  text: string;
  onClick?: () => void;
  surface?: TypeTagSurface;
};

export default function Tag({
  text,
  onClick,
  surface = "surface-accent",
}: TagProps) {
  return (
    <span
      className={`${surface} label-small rounded-full px-1.5 py-0.5`}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
