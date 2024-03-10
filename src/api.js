import { categories, recipes } from "./data";

export function fetchCategories() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 100);
  });
}

export function fetchRecipes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipes);
    }, 100);
  });
}
