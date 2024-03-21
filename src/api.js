import axios from "axios";
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

export async function fetchRecipes(props) {
  try {
    const category = props?.categoryId ? `category=${props.categoryId}` : "";
    const search = props?.searchQuery ? `&search=${props.searchQuery}` : "";
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`;
    // const response = await fetch(url);
    // const data = response.json();
    // return data;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
