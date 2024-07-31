import React, { useState, useRef, useEffect } from "react";
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

const Dropdown = ({ isOpen, onClose, children, align = "left" }) => {
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleOutsideClick = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener("mousedown", handleOutsideClick);
      } else {
         document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [isOpen, onClose]);

   return (
      isOpen && (
         <div
            ref={dropdownRef}
            className={`absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 ${align === "right" ? "right-0" : "left-0"}`}
         >
            {children}
         </div>
      )
   );
};

function Header() {
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
                     className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                     onClick={handleNotificationsClick}
                     aria-label="Notifications"
                     aria-haspopup="true"
                  >
                     <BellIcon className="w-5 h-5" aria-hidden="true" />
                     <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                     ></span>
                  </button>

                  <Dropdown
                     align="right"
                     isOpen={isNotificationsMenuOpen}
                     onClose={() => setIsNotificationsMenuOpen(false)}
                  >
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
                  </Dropdown>
               </li>
               <li className="relative">
                  <button
                     className="rounded-full focus:shadow-outline-purple focus:outline-none"
                     onClick={handleProfileClick}
                     aria-label="Account"
                     aria-haspopup="true"
                  >
                     <Avatar
                        className="align-middle"
                        src={response.avatar}
                        alt=""
                        aria-hidden="true"
                     />
                  </button>
                  <Dropdown
                     align="right"
                     isOpen={isProfileMenuOpen}
                     onClose={() => setIsProfileMenuOpen(false)}
                  >
                     <div className="flex gap-0.5 items-center px-4 py-2 text-sm text-gray-700">
                        <OutlinePersonIcon
                           className="w-4 h-4 mr-3"
                           aria-hidden="true"
                        />
                        <span>Profile</span>
                     </div>
                     <div className="flex gap-0.5 items-center px-4 py-2 text-sm text-gray-700">
                        <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                        <span>Settings</span>
                     </div>
                     <div className="flex gap-0.5 items-center px-4 py-2 text-sm text-gray-700" onClick={() => alert("Log out!")}>
                        <OutlineLogoutIcon
                           className="w-4 h-4 mr-3"
                           aria-hidden="true"
                        />
                        <span>Log out</span>
                     </div>
                  </Dropdown>
               </li>
            </ul>
         </div>
      </header>
   );
}

export default Header;
