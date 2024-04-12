import { useNavigate } from "react-router-dom";

type TopAppBarProps = {
  title: string;
  back?: boolean;
};

export default function TopAppBar({ title, back }: TopAppBarProps) {
  const navigate = useNavigate();

  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2">
        {back && (
          <svg onClick={() => navigate(-1)} className="size-3">
            <use href="/images/icons.svg#arrow_left" />
          </svg>
        )}
        <h1 className="headline-large line-clamp-1 grow">{title}</h1>
      </div>
    </div>
  );
}
