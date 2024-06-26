import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { EditProfile } from "./pages/editProfile";
import { EditList } from "./pages/editList";
import { Navbar } from "./components/navbar";

const authLogin = () => {
  if (!localStorage.getItem("access_token")) {
    return redirect("/login");
  }
  return null;
}

const authNotLogin = () => {
  if (localStorage.getItem("access_token")) {
    return redirect("/");
  }
  return null;
}


const router = createBrowserRouter([
  {
    element: < Register />,
    path: "/register",
    loader: authNotLogin
  },
  {
    element: < Login />,
    path: "/login",
    loader: authNotLogin
  },
  {
    element: < Navbar />,
    children: [
      {
        element: < Profile />,
        path: "/profile/:id",
      },
      {
        element: < Home />,
        path: "/",
        loader: authLogin
      },
      {
        element: < EditProfile />,
        path: "/profile/edit/:id",
        loader: authLogin
      },
      {
        element: < EditList />,
        path: "/list/edit/:id",
        loader: authLogin
      },
    ]
  },
 
]);

export default router;
