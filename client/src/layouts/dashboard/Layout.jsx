import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { useLocation, Outlet, Routes, Route } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import Main from './Main'
import ThemedSuspense from '../../components/dashboard/ThemedSuspense'
import { SidebarContext } from '../../context/dashboard/SideBarContext'
import routes from '../../routes'

const Page404 = lazy(() => import('../../pages/dashboard/404'))

const Layout = () => {
   const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
   let location = useLocation()

   useEffect(() => {
      closeSidebar()
   }, [location])

   return (
      <div className={`.dashboard flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
         <Sidebar />
         <div className="flex flex-col flex-1 w-full">
            <Header />
            <Main>
               <Suspense fallback={<ThemedSuspense />}>
                  <Outlet />
               </Suspense>
            </Main>
         </div>
      </div>
   )
}

export default Layout
