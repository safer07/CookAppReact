import { useState } from "react";
import { useProfile } from "../context/UserProfileContext";

export default function LikeButton({ active, recipeId }) {
  const [isActive, setIsActive] = useState(active);
  const [animation, setAnimation] = useState(false);
  const { handleLike } = useProfile();

  function onClick() {
    handleLike(recipeId);
    setIsActive((prev) => !prev);
    setAnimation(true);
  }

  return (
    <div
      className={`like-button ${isActive ? "active" : ""}`}
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
      {/* <svg>
        {!isActive && <use href="./images/icons.svg#heart" />}
        {isActive && <use href="./images/icons.svg#heart_filled" />}
      </svg> */}
    </div>
  );
}