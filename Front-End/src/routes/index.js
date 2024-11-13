import LayoutClient from "../layout/LayoutClient/LayoutClient";
import CartPage from "../pages/CartPage/CartPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const routes = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />
      },
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/cart",
        element: <CartPage/>
      },
      {
        path: "/pages/about-us",
        element: <ContactPage/>
      },
      {
        path: "/collections",
        element: <CategoryPage />
      },
      {
        path: "/products/:slug",
        element: <ProductPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  }
]