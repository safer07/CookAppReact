export type CreateRecipeResponse = {
  message: string
  recipe: IFullRecipeItem
}

export type CreateRecipeErrorResponse = {
  message: string
  error: { message: string }
}
