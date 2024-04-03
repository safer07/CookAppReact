import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// import { UserProfileContextProvider } from "./context/UserProfileContext";
import AppRouter from "./AppRouter";
import { store } from "../redux/store";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* <UserProfileContextProvider> */}
      <Provider store={store}>
        <AppRouter />
      </Provider>
      {/* </UserProfileContextProvider> */}
    </BrowserRouter>
  );
}
