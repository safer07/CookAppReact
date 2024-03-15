import { categories, recipes } from "./data";

export function fetchCategories() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 100);
  });
}

// export function fetchRecipes() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(recipes);
//     }, 100);
//   });
// }

export async function fetchRecipes() {
  // return fetch("https://65f16da8034bdbecc7628a2a.mockapi.io/recipes")
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.error(error);
  //   });
  try {
    const url = "https://65f16da8034bdbecc7628a2a.mockapi.io/recipes";
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
