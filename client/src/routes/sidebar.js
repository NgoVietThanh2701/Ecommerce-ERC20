/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
   {
      path: "/dashboard", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "Dashboard", // name that appear in Sidebar
   },
   {
      path: "/dashboard/orders",
      icon: "CartIcon",
      name: "Orders",
   },
   {
      icon: "TruckIcon",
      name: "Products",
      routes: [
         {
            path: "/dashboard/all-products",
            name: "All Products",
         },
         {
            path: "/dashboard/add-product",
            name: "Add Product",
         },
      ],
   },
   {
      path: "/dashboard/customers",
      icon: "GroupIcon",
      name: "Customers",
   },
   {
      path: "/dashboard/chats",
      icon: "ChatIcon",
      name: "Chats",
   },
   {
      path: "/dashboard/manage-profile",
      icon: "UserIcon",
      name: "Profile",
   },
   {
      path: "/dashboard/settings",
      icon: "OutlineCogIcon",
      name: "Settings",
   }
];

export default routes;
