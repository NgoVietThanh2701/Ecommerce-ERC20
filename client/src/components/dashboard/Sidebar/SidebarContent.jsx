import React from "react";
import routes from "../../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../../assets/dashboard/icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";

function Icon({ icon, ...props }) {
   const Icon = Icons[icon];
   return <Icon {...props} />;
}

const styleSideBar = `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200
inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`
const styleActiveSidBar = `text-gray-800 dark:text-gray-100 flex font-medium text-sm`

function SidebarContent() {
   return (
      <div className="py-4 text-gray-500 dark:text-gray-400">
         <a
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="http://localhost:3000/"
         >
            E-Commerce
         </a>
         <ul className="mt-6">
            {routes.slice(0, -3).map((route) =>
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

            {routes.slice(-3).map((route) => (
               <li className="relative px-6 py-3.5" key={route.name}>
                  <NavLink
                     exact={route.exact}
                     to={route.path}
                     className={({ isActive }) => (isActive ? styleActiveSidBar : styleSideBar)}
                  >
                     <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                     <span className="ml-4">{route.name}</span>
                  </NavLink>
               </li>
            ))}
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
