import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from "./pages/shop/Home";
import DefaultLayout from "./layouts/shop/DefaultLayout";
import Products from "./pages/shop/Products";
import SingleProduct from "./pages/shop/SingleProduct";
import CartPage from "./pages/shop/CartPage";
import Layout from "./layouts/dashboard/Layout.jsx";
import routes from "./routes";
import Page404 from "./pages/dashboard/404.jsx";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<DefaultLayout />}>
               <Route index element={<Home />} />
               <Route path="products" element={<Products />} />
               <Route path="products/:id" element={<SingleProduct />} />
               <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="/dashboard" element={<Layout />}>
               {routes.map((route, index) => (
                  <Route path={route.path} element={<route.component />} key={index} />
               ))}
            </Route>
            <Route path="*" element={<Page404 />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
