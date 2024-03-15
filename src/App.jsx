import { BrowserRouter } from "react-router-dom";
import { UserProfileContextProvider } from "./context/UserProfileContext";
import AppRouter from "./AppRouter";

export default function App() {
  return (
    <UserProfileContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProfileContextProvider>
  );
}
