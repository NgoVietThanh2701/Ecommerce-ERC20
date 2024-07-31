import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Orders = lazy(() => import("../pages/dashboard/Orders"));
const ProductsAll = lazy(() => import("../pages/dashboard/ProductsAll"));
const SingleProduct = lazy(() => import("../pages/dashboard/SingleProduct"));
const AddProduct = lazy(() => import("../pages/dashboard/AddProduct"));
const Page404 = lazy(() => import("../pages/dashboard/404"));
const Blank = lazy(() => import("../pages/dashboard/Blank"));

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
const routes = [
   {
      path: "",
      component: Dashboard,
   },
   {
      path: "orders",
      component: Orders,
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
      path: "customers",
      component: Blank,
   },
   {
      path: "chats",
      component: Blank,
   },
   {
      path: "manage-profile",
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
      path: "blank",
      component: Blank,
   },
];

export default routes;
