import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayout/RootLayOut";
import Home from "../Pages/Home/Home";
import AddCoffee from "../Pages/AddCoffee/AddCoffee";
import UpDate from "../Pages/UpDate/UpDate";
export const router = createBrowserRouter([
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
    ],
  },
]);