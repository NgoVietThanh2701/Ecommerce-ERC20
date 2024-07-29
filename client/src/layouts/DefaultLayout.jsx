import React from 'react'
import Footer from "../components/default/Footer.jsx";
import Header from "../components/default/Header.jsx";
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