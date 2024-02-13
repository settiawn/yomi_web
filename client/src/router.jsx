import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    element: < Login />,
    path: "/login",
  },
  {
    element: <div>Hello World</div>,
    path: "/",
  },
]);

export default router;
