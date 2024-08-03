import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/shop/DefaultLayout";
import Layout from "./layouts/dashboard/Layout.jsx";
import { routeShop, routesDashboard } from "./routes";
import Page404 from "./pages/dashboard/404.jsx";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<DefaultLayout />}>
               {routeShop.map((route, index) => (
                  <Route path={route.path} element={<route.component />} key={index} />
               ))}
            </Route>
            <Route path="/dashboard" element={<Layout />}>
               {routesDashboard.map((route, index) => (
                  <Route path={route.path} element={<route.component />} key={index} />
               ))}
            </Route>
            <Route path="*" element={<Page404 />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
