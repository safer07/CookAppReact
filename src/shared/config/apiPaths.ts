export const API_PATHS = {
  user: {
    registration: '/users/registration',
    login: '/users/login',
    logout: '/users/logout',
    refresh: '/users/refresh',
    getProfile: '/users/profile',
    updateProfile: '/users/profile',
    forgotPassword: '/users/forgot-password',
    resetPassword: '/users/reset-password',
    changePassword: '/users/change-password',
  },
  recipes: {
    getAll: '/recipes',
    getOne: '/recipes',
    createRecipe: '/recipes',
    updateRecipe: '/recipes',
    delete: '/recipes',
    getSimilar: '/recipes/similar',
    favorite: '/recipes/favorite',
    myRecipes: '/recipes/my-recipes',
    getCategories: '/recipes/categories',
  },
  favorites: {
    getFavoriteRecipes: '/favorites/recipes',
    likeRecipe: '/favorites/recipes',
    unlikeRecipe: '/favorites/recipes',
  },
}
