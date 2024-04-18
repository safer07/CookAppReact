import { useState } from "react";

type LikeButtonProps = {
  active: boolean;
  itemId: string;
  handleLike: (itemId: string) => void;
  className: string;
};

export default function LikeButton({
  active,
  itemId,
  handleLike,
  className = "",
}: LikeButtonProps) {
  const [isActive, setIsActive] = useState(active);
  const [animation, setAnimation] = useState(false);

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    handleLike(itemId);
    setIsActive((prev) => !prev);
    setAnimation(true);
  }

  return (
    <button
      className={`like-button ${className} ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {!isActive ? (
        <svg>
          <use href="/images/icons.svg#heart" />
        </svg>
      ) : (
        <img
          className={`${animation ? "animate-blink" : ""}`}
          src="/images/icons/heart_filled.svg"
        />
      )}
    </button>
  );
}
