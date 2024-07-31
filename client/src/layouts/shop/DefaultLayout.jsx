import React from 'react'
import Footer from "../../components/shop/default/Footer.jsx";
import Header from "../../components/shop/default/Header.jsx";
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   )
}

export default DefaultLayout