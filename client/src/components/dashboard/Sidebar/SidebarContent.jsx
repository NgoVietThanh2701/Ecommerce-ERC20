import React, { useState, useEffect } from "react";
import { routesAdmin, routesSeller, routesShipper } from "../../../routes/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import * as Icons from "../../../assets/dashboard/icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import ProductContract from "../../../contracts/Product.contract.ts";

function Icon({ icon, ...props }) {
   const Icon = Icons[icon];
   return <Icon {...props} />;
}

const styleSideBar = `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200
inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`
const styleActiveSidBar = `text-gray-800 dark:text-gray-100 flex font-medium text-sm`

function SidebarContent({ address, web3Provider }) {

   const navigate = useNavigate();
   // check user
   const [isSeller, setIsSeller] = useState(false);
   const [isShipper, setIsShipper] = useState(false);

   const checkSeller = async () => {
      let result = false;
      const productContract = new ProductContract(web3Provider);
      result = await productContract.isSeller(address);
      setIsSeller(result);
   }

   const checkShipper = async () => {
      let result = false;
      const productContract = new ProductContract(web3Provider);
      result = await productContract.isShipper(address);
      setIsShipper(result);
   }

   useEffect(() => {
      if (web3Provider) {
         checkSeller();
         checkShipper();
      }
   }, [web3Provider, address]);

   useEffect(() => {
      if (!isSeller && !isShipper && address !== process.env.REACT_APP_ADMIN && address !== "") {
         navigate('../')
      }
   }, [isSeller, isShipper]);


   return (
      <div className="py-4 text-gray-500 dark:text-gray-400">
         <a
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="http://localhost:3000/"
         >
            E-Commerce
         </a>
         <ul className="mt-4">
            {address === process.env.REACT_APP_ADMIN && <>
               {routesAdmin.map((route) =>
                  route.routes ? (
                     <SidebarSubmenu route={route} key={route.name} />
                  ) : (
                     <li className="relative px-6 py-3.5" key={route.name}>
                        <NavLink
                           exact={route.exact}
                           to={route.path}
                           className={({ isActive }) => (isActive ? styleActiveSidBar : styleSideBar)}
                        >
                           <Icon
                              className="w-5 h-5"
                              aria-hidden="true"
                              icon={route.icon}
                           />
                           <span className="ml-4">{route.name}</span>
                        </NavLink>
                     </li>
                  )
               )}
               <hr className="customeDivider mx-4 my-5" />
            </>}

            {isSeller && <>
               {routesSeller.map((route) =>
                  route.routes ? (
                     <SidebarSubmenu route={route} key={route.name} />
                  ) : (
                     <li className="relative px-6 py-3.5" key={route.name}>
                        <NavLink
                           exact={route.exact}
                           to={route.path}
                           className={({ isActive }) => (isActive ? styleActiveSidBar : styleSideBar)}
                        >
                           <Icon
                              className="w-5 h-5"
                              aria-hidden="true"
                              icon={route.icon}
                           />
                           <span className="ml-4">{route.name}</span>
                        </NavLink>
                     </li>
                  )
               )}
               <hr className="customeDivider mx-4 my-5" />
            </>}

            {isShipper && <>
               {routesShipper.map((route) =>
                  route.routes ? (
                     <SidebarSubmenu route={route} key={route.name} />
                  ) : (
                     <li className="relative px-6 py-1" key={route.name}>
                        <NavLink
                           exact={route.exact}
                           to={route.path}
                           className={({ isActive }) => (isActive ? styleActiveSidBar : styleSideBar)}
                        >
                           <Icon
                              className="w-5 h-5"
                              aria-hidden="true"
                              icon={route.icon}
                           />
                           <span className="ml-4">{route.name}</span>
                        </NavLink>
                     </li>
                  )
               )}
               <hr className="customeDivider mx-4 my-5" />
            </>}
         </ul>

         <div className="px-6 my-6">
            <Button>
               Genarate Report
               <span className="ml-2" aria-hidden="true">
                  +
               </span>
            </Button>
         </div>
      </div>
   );
}

export default SidebarContent;
