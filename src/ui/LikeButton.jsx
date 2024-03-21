import { useState } from "react";

import { useProfile } from "../context/UserProfileContext";

export default function LikeButton({ active, recipeId, className }) {
  const [isActive, setIsActive] = useState(active);
  const [animation, setAnimation] = useState(false);
  const { handleLike } = useProfile();

  function onClick() {
    handleLike(recipeId);
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
