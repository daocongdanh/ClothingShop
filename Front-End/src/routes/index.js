import LayoutClient from "../layout/LayoutClient/LayoutClient";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";

export const routes = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/cart",
        element: <CartPage/>
      },

    ]
  }
]