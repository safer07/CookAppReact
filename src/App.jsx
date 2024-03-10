import { UserProfileContextProvider } from "./context/UserProfileContext";
import RecipesPage from "./pages/RecipesPage";

export default function App() {
  return (
    <UserProfileContextProvider>
      <RecipesPage />
    </UserProfileContextProvider>
  );
}
