import SideBar from "../components/SideBar/SideBar";
import LayoutClient from "../layout/LayoutClient/LayoutClient";
import AddressPage from "../pages/Account/AddressPage/AddressPage";
import HomeAccountPage from "../pages/Account/HomeAccountPage/HomeAccountPage";
import InformationPage from "../pages/Account/InformationPage/InformationPage";
import OrderHistoryPage from "../pages/Account/OrderHistoryPage/OrderHistoryPage";
import CartPage from "../pages/CartPage/CartPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";

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
        path: "",
        element: <HomePage/>
      },
      {
        path: "cart",
        element: <CartPage/>
      },
      {
        path: "pages/about-us",
        element: <ContactPage/>
      },
      {
        path: "collections",
        element: <CategoryPage />
      },
      {
        path: "products/:slug",
        element: <ProductPage />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "account",
        element: <SideBar />,
        children: [
          {
            path: "",
            element: <HomeAccountPage />
            // index: true
          },
          {
            path: "history",
            element: <OrderHistoryPage />
          },
          {
            path: "information",
            element: <InformationPage />
          },
          {
            path: "address",
            element: <AddressPage />
          },

        ]
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
]