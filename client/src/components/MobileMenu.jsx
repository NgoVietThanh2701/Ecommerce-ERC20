import {
   AiOutlineClose,
   AiOutlineHeart,
   AiOutlineShoppingCart,
   AiOutlineUser,
} from "react-icons/ai";

import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const MobileMenu = ({ Menu, showMobileMenu, toggleMobileMenu }) => {
   return (
      <div
         className={`mobile-menu py-10 absolute z-50 top-0 left-0 min-h-screen w-full flex flex-col gap-5 items-center bg-grayBG md:hidden ${showMobileMenu ? "slide-in" : "slide-out"
            }`}
      >
         <AiOutlineClose
            onClick={toggleMobileMenu}
            className="absolute top-6 text-lg cursor-pointer right-6 hover:rotate-180 duration-300 transition-transform"
         />
         <ul className="nav-menu flex flex-col items-center gap-8 font-caustenmedium text-lg text-secondary">
            {Menu.map((item) => (
               <li key={item.id}>
                  <Link onClick={toggleMobileMenu} to={item.link}>
                     {item.title}
                  </Link>
               </li>
            ))}
         </ul>
         <div className="relative">
            <input
               type="text"
               placeholder="Search"
               className="h-[44px] w-[265px] bg-white py-4 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 delay-75"
            />
            <CiSearch className="absolute top-3 text-lg text-secondary left-3" />
         </div>
         <div className="flex gap-4 text-secondary text-lg ">
            <button className="bg-white p-3 rounded-md hover:bg-blueBar hover:text-white transition-all duration-200 delay-75">
               <AiOutlineHeart />
            </button>
            <button className="bg-white p-3 rounded-md hover:bg-blueBar hover:text-white transition-all duration-200 delay-75">
               <AiOutlineUser />
            </button>
            <Link
               onClick={toggleMobileMenu}
               to={"/cart"}
               className="bg-white p-3 rounded-md hover:bg-blueBar hover:text-white transition-all duration-200 delay-75"
            >
               <AiOutlineShoppingCart />
            </Link>
         </div>
      </div>
   );
};

export default MobileMenu;
