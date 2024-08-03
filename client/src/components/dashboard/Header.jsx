import React, { useState } from "react";
import { useContext } from "react";
import { SidebarContext } from "../../context/dashboard/SideBarContext";
import {
   SearchIcon,
   MoonIcon,
   SunIcon,
   BellIcon,
   MenuIcon,
   OutlinePersonIcon,
   OutlineCogIcon,
   OutlineLogoutIcon,
} from "../../assets/dashboard/icons";
import {
   Avatar,
   Badge,
   Input,
   WindmillContext,
} from "@windmill/react-ui";
import response from "../../utils/demo/profileData";
import { Link } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { showShortAddress } from "../../utils/functionUtils";

function Header({ connectWallet, address, balance }) {
   const { mode, toggleMode } = useContext(WindmillContext);
   const { toggleSidebar } = useContext(SidebarContext);

   const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

   function handleNotificationsClick() {
      setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
   }

   function handleProfileClick() {
      setIsProfileMenuOpen(!isProfileMenuOpen);
   }

   return (
      <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
         <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
            <button
               className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
               onClick={toggleSidebar}
               aria-label="Menu"
            >
               <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="flex justify-center flex-1 lg:mr-32">
               <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                     <SearchIcon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                     className="pl-8 text-gray-700"
                     placeholder="Search for projects"
                     aria-label="Search"
                  />
               </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
               <li className="flex">
                  <button
                     className="rounded-md focus:outline-none focus:shadow-outline-purple"
                     onClick={toggleMode}
                     aria-label="Toggle color mode"
                  >
                     {mode === "dark" ? (
                        <SunIcon className="w-5 h-5" aria-hidden="true" />
                     ) : (
                        <MoonIcon className="w-5 h-5" aria-hidden="true" />
                     )}
                  </button>
               </li>
               <li className="relative">
                  <button
                     className="group relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                     onClick={handleNotificationsClick}
                     aria-label="Notifications"
                     aria-haspopup="true"
                  >
                     <BellIcon className="w-5 h-5" aria-hidden="true" />
                     <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                     ></span>
                     <ul className='w-60 bg-white hidden group-hover:block absolute top-10 right-0  rounded-b-md z-20 shadow-md py-2 transform transition duration-300'>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700">
                           <span>Messages</span>
                           <Badge type="danger">13</Badge>
                        </div>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700">
                           <span>Sales</span>
                           <Badge type="danger">2</Badge>
                        </div>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700" onClick={() => alert("Alerts!")}>
                           <span>Alerts</span>
                        </div>
                     </ul>
                     <div className="z-10 h-7 w-12 absolute top-full right-0"></div>
                  </button>
               </li>
               <li>
                  {address ? <button
                     className="group relative rounded-full focus:shadow-outline-purple focus:outline-none flex items-center gap-2.5"
                     onClick={handleProfileClick}
                     aria-label="Account"
                     aria-haspopup="true"
                  >
                     <span className="font-medium text-[15px]">{showShortAddress(address, 5)} ({balance} LCK)</span>
                     <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
                     <ul className='w-60 bg-white hidden group-hover:block absolute top-10 right-0  rounded-b-md z-20 shadow-md py-2 transform transition duration-300'>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700">
                           <span>Messages</span>
                           <Badge type="danger">13</Badge>
                        </div>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700">
                           <span>Sales</span>
                           <Badge type="danger">2</Badge>
                        </div>
                        <div className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700" onClick={() => alert("Alerts!")}>
                           <span>Alerts</span>
                        </div>
                     </ul>
                     <div className="z-10 h-7 w-40 absolute top-full right-0"></div>
                  </button> :
                     <button onClick={connectWallet} type="button" className="text-white text-sm bg-purple-600 hover:bg-purple-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2 me-2 dark:bg-purple-600 dark:hover:bg-purple-600 focus:outline-none dark:focus:bg-purple-600">Connect Metamask</button>}
               </li>
            </ul>
         </div>
      </header>
   );
}

export default Header;
