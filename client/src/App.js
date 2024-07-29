import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<DefaultLayout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<SingleProduct />} />
                  <Route path="cart" element={<CartPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
