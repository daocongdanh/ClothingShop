import LayoutClient from "../layout/LayoutClient/LayoutClient";
import CartPage from "../pages/CartPage/CartPage";
import ContactPage from "../pages/ContactPage/ContactPage";
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
        path: "/gio-hang",
        element: <CartPage/>
      },
      {
        path: "/lien-he",
        element: <ContactPage/>
      }
    ]
  }
]