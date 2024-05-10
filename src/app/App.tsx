import { BrowserRouter } from "react-router-dom";

import AppRouter from "./AppRouter";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRouter />
    </BrowserRouter>
  );
}
