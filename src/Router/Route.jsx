import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayout/RootLayOut";
import Home from "../Pages/Home/Home";
import AddCoffee from "../Pages/AddCoffee/AddCoffee";
import UpDate from "../Pages/UpDate/UpDate";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import CoffeeUsers from "../Pages/CoffeeUsers/CoffeeUsers";
import CoffeeDetails from "../Pages/CoffeeDetails/CoffeeDetails";

import { AuthContext } from "../Context/Context";
import MyCoffee from "../Pages/MyCoffee/MyCoffee";


export const router = createBrowserRouter(
  [
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/coffee"),
        Component: Home,
      },
      {
        path: "add-coffee",
        Component: AddCoffee,
      },
      {
        path: "coffee-upDate/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/coffee/${params.id}`),
        Component: UpDate,
      },
      {
        path: "sign-in",
        Component: SignIn,
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
      {
        path: "coffee-users",
        Component: CoffeeUsers,
      },
      {
        path: "coffee-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/coffee/${params.id}`),
        Component: CoffeeDetails,
      },
      {
        path: 'my-coffee',
        Component:MyCoffee,
      }
    ],
  },
]);