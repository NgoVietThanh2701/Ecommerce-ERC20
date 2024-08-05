import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Home = lazy(() => import("../pages/shop/Home"));
const Products = lazy(() => import("../pages/shop/Products"));
const SingleProductShop = lazy(() => import("../pages/shop/SingleProduct"));
const BuyToken = lazy(() => import("../pages/shop/BuyToken"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Request = lazy(() => import("../pages/dashboard/Request"));
const ProductsAll = lazy(() => import("../pages/dashboard/ProductsAll"));
const SingleProduct = lazy(() => import("../pages/dashboard/SingleProduct"));
const AddProduct = lazy(() => import("../pages/dashboard/AddProduct"));
const Page404 = lazy(() => import("../pages/dashboard/404"));
const Blank = lazy(() => import("../pages/dashboard/Blank"));
const User = lazy(() => import("../pages/dashboard/User"));
const Order = lazy(() => import("../pages/dashboard/Order"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */

export const routeShop = [
   {
      path: "",
      component: Home
   },
   {
      path: "products",
      component: Products
   },
   {
      path: "products/:id",
      component: SingleProductShop
   },
   {
      path: "buy-token",
      component: BuyToken
   }
]

export const routesDashboard = [
   {
      path: "",
      component: Dashboard,
   },
   {
      path: "request",
      component: Request
   },
   {
      path: "all-products",
      component: ProductsAll,
   },
   {
      path: "add-product",
      component: AddProduct,
   },
   {
      path: "product/:id",
      component: SingleProduct,
   },
   {
      path: "ship",
      component: Blank,
   },
   {
      path: "users",
      component: User,
   },
   {
      path: "chats",
      component: Blank,
   },
   {
      path: "settings",
      component: Blank,
   },
   {
      path: "404",
      component: Page404,
   },
   {
      path: 'order',
      component: Order
   }
];
