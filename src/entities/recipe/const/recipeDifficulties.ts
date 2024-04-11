type RecipeDifficultyItem = {
  difficultyText: string;
  tagDifficultySurface: string;
};

type IRecipeDifficulties = {
  [key: number | string]: RecipeDifficultyItem;
};

const recipeDifficulties: IRecipeDifficulties = {
  1: { difficultyText: "Легко", tagDifficultySurface: "surface-green" },
  2: { difficultyText: "Средне", tagDifficultySurface: "surface-yellow" },
  3: { difficultyText: "Трудно", tagDifficultySurface: "surface-red" },
  error: { difficultyText: "???", tagDifficultySurface: "surface-red" },
};

export default recipeDifficulties;
