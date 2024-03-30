import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { categories } from "../../data/data";
import {
  addRecipe,
  removeRecipe,
  selectLikedRecipes,
} from "../../redux/slices/likedRecipesSlice";
import {
  fetchFullRecipe,
  selectFullRecipe,
} from "../../redux/slices/fullRecipeSlice";
import RecipeInfoSkeleton from "./RecipeInfoSkeleton";
import CookingMode from "./CookingMode";
import FeaturedRecipes from "./FeaturedRecipes";
import LikeButton from "../../ui/LikeButton";
import ButtonIcon from "../../ui/ButtonIcon";
import Tag from "../../ui/Tag";
// import scrollNoSmooth from "../../utils/scrollNoSmooth";
import SegmentedButton from "../../ui/SegmentedButton";
import ListItem from "../../ui/ListItem";
import Button from "../../ui/Button";

export default function RecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe, status } = useSelector(selectFullRecipe);
  const likedRecipes = useSelector(selectLikedRecipes);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [cookingMode, setCookingMode] = useState(false);
  const tabs = ["Ингредиенты", "Рецепт"];

  const recipeCategory = categories.find(
    (category) => category.id === recipe?.category,
  );

  let difficultyText, tagDifficultySurface;

  switch (recipe?.difficulty) {
    case 1:
      difficultyText = "Легко";
      tagDifficultySurface = "surface-green";
      break;
    case 2:
      difficultyText = "Средне";
      tagDifficultySurface = "surface-yellow";
      break;
    case 3:
      difficultyText = "Трудно";
      tagDifficultySurface = "surface-red";
      break;
    default:
      difficultyText = "???";
  }

  useEffect(() => {
    setCookingMode(false);
    dispatch(fetchFullRecipe(id));
    setActiveTabIndex(0);
  }, [id]);

  // useLayoutEffect(() => {
  //   scrollNoSmooth();
  // }, [id]);

  function handleLike(id) {
    if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
    else dispatch(addRecipe(id));
  }

  if (cookingMode) {
    return <CookingMode recipe={recipe} setCookingMode={setCookingMode} />;
  }

  return (
    <>
      {status === "loading" && <RecipeInfoSkeleton />}
      {status === "error" && (
        <h1 className="headline-large">Не удалось загрузить рецепт</h1>
      )}
      {status === "success" && (
        <>
          <div className="layout-fullwidth relative">
            <img
              className="aspect-[9/7] w-full object-cover"
              src={recipe?.img}
              alt={recipe?.name}
            />
            <ButtonIcon
              className="absolute left-2 top-2"
              icon="/images/icons.svg#arrow_left"
              onClick={() => navigate(-1)}
            />
            <LikeButton
              className="absolute right-2 top-2"
              active={likedRecipes.includes(recipe.id)}
              itemId={recipe.id}
              handleLike={handleLike}
            />
          </div>
          <div className="grid gap-1 pb-2 pt-1">
            <div>
              <h1 className="headline-large">{recipe?.name}</h1>
              <p className="pt-0.5 text-secondary-color">
                {recipeCategory.fullName}
              </p>
            </div>
            <p className="text-secondary-color">{recipe.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <svg className="size-2 fill-primary">
                  <use href="/images/icons.svg#clock"></use>
                </svg>
                <div className="label-small text-secondary-color">
                  {recipe.time} минут
                </div>
              </div>
              <Tag text={difficultyText} surface={tagDifficultySurface} />
            </div>
          </div>
          <SegmentedButton
            buttons={tabs}
            handleClick={setActiveTabIndex}
            activeTabIndex={activeTabIndex}
          />
          {activeTabIndex === 0 && (
            <ul className="layout-fullwidth mt-1">
              {recipe.totalIngredients.map((item, index) => (
                <ListItem
                  key={index}
                  size="tiny"
                  text={item.name}
                  secondaryText={`${item.amount} ${item.unit}`}
                />
              ))}
            </ul>
          )}
          {activeTabIndex === 1 && recipe.steps && (
            <ol className="mt-2 grid gap-2">
              {recipe.steps.map((step, index) => (
                <li key={index} className="grid gap-1">
                  <div className="headline-medium">Шаг {index + 1}</div>
                  {step.ingredients.length > 0 && (
                    <ul className="layout-fullwidth">
                      {step.ingredients.map((item, index) => (
                        <ListItem
                          key={index}
                          size="tiny"
                          text={item.name}
                          secondaryText={`${item.amount} ${item.unit}`}
                        />
                      ))}
                    </ul>
                  )}
                  <p className="text-secondary-color">{step.description}</p>
                  {step.img && (
                    <img
                      className="w-full"
                      src={step.img}
                      alt={`Шаг ${index + 1}`}
                    />
                  )}
                </li>
              ))}
            </ol>
          )}
          <div className="my-2">
            <Button
              text="Начать готовить"
              onClick={() => setCookingMode(true)}
              type="primary"
              block
            />
          </div>

          <FeaturedRecipes excludeId={recipe.id} />
        </>
      )}
    </>
  );
}
