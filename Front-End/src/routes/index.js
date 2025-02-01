import SideBar from "../components/SideBar/SideBar";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutClient from "../layout/LayoutClient/LayoutClient";
import AddressPage from "../pages/client/Account/AddressPage/AddressPage";
import HomeAccountPage from "../pages/client/Account/HomeAccountPage/HomeAccountPage";
import InformationPage from "../pages/client/Account/InformationPage/InformationPage";
import OrderHistoryPage from "../pages/client/Account/OrderHistoryPage/OrderHistoryPage";
import CategoryAdmin from "../pages/admin/CategoryAdmin/CategoryAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin/HomeAdmin";
import OrderAdmin from "../pages/admin/OrderAdmin/OrderAdmin";
import PaymentMethodAdmin from "../pages/admin/PaymentMethodAdmin/PaymentMethodAdmin";
import ProductAdmin from "../pages/admin/ProductAdmin/ProductAdmin";
import ReviewAdmin from "../pages/admin/ReviewAdmin/ReviewAdmin";
import UserAdmin from "../pages/admin/UserAdmin/UserAdmin";
import CartPage from "../pages/client/CartPage/CartPage";
import CategoryPage from "../pages/client/CategoryPage/CategoryPage";
import CheckoutPage from "../pages/client/CheckoutPage/CheckoutPage";
import ContactPage from "../pages/client/ContactPage/ContactPage";
import HomePage from "../pages/client/HomePage/HomePage";
import LoginPage from "../pages/client/LoginPage/LoginPage";
import NotFoundPage from "../pages/client/NotFoundPage/NotFoundPage";
import ProductPage from "../pages/client/ProductPage/ProductPage";
import RegisterPage from "../pages/client/RegisterPage/RegisterPage";
import SearchPage from "../pages/client/SearchPage/SearchPage";
import PaymentStatus from "../pages/client/PaymentStatus/PaymentStatus";

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
        path: "checkout",
        element: <CheckoutPage />
      },
      {
        path: "payment-status/:status",
        element: <PaymentStatus />
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
            path: "order",
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
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <HomeAdmin />
      },
      {
        path: "orders",
        element: <OrderAdmin />
      },
      {
        path: "categories",
        element: <CategoryAdmin />
      },
      {
        path: "products",
        element: <ProductAdmin />
      },
      {
        path: "payment-methods",
        element: <PaymentMethodAdmin />
      },
      {
        path: "reviews",
        element: <ReviewAdmin />
      },
      {
        path: "users",
        element: <UserAdmin />
      }
    ]
  }
]