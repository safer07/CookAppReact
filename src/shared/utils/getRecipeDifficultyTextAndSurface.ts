import recipeDifficulties from "../../entities/recipe/const/recipeDifficulties";

export default function getRecipeDifficultyTextAndSurface(
  recipeDifficulty: number | undefined,
) {
  const difficultyText = recipeDifficulty
    ? recipeDifficulties[recipeDifficulty].difficultyText
    : recipeDifficulties.error.difficultyText;

  const tagDifficultySurface = recipeDifficulty
    ? recipeDifficulties[recipeDifficulty].tagDifficultySurface
    : recipeDifficulties.error.tagDifficultySurface;

  return [difficultyText, tagDifficultySurface];
}
