/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
export const routesAdmin = [
   {
      path: "/dashboard", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "Dashboard", // name that appear in Sidebar
   },
   {
      path: "/dashboard/request",
      icon: "GroupIcon",
      name: "Đăng ký",
   },
   {
      path: "/dashboard/users",
      icon: "ChatIcon",
      name: "Người dùng",
   }
];

export const routesSeller = [
   {
      path: "/dashboard",
      icon: "HomeIcon",
      name: "Dashboard",
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
      path: "/dashboard/order",
      icon: "HomeIcon",
      name: "Đơn đặt hàng",
   },
]

export const routesShipper = [
   {
      path: "ship",
      icon: "HomeIcon",
      name: "Đơn hàng",
   },
]


