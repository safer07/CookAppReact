import { useState } from "react";

export default function LikeButton({ active, itemId, handleLike, className }) {
  const [isActive, setIsActive] = useState(active);
  const [animation, setAnimation] = useState(false);

  function onClick(event) {
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
          <use href="./images/icons.svg#heart" />
        </svg>
      ) : (
        <img
          className={`${animation ? "animate-blink" : ""}`}
          src="./images/icons/heart_filled.svg"
        />
      )}
    </button>
  );
}
