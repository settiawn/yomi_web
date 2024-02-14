import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { EditProfile } from "./pages/editProfile";
import { EditList } from "./pages/editList";

const router = createBrowserRouter([
  {
    element: < Register />,
    path: "/register",
  },
  {
    element: < Login />,
    path: "/login",
  },
  {
    element: < Home />,
    path: "/",
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    }
  },
  {
    element: < Profile />,
    path: "/profile",
  },
  {
    element: < EditProfile />,
    path: "/profile/edit/:id",
  },
  {
    element: < EditList />,
    path: "/mylist/edit/:id",
  },
]);

export default router;
