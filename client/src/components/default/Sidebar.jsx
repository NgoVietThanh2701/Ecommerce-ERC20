import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

import CategoryFilter from "../widgets/CategoryFilter";
import ColorFilter from "../widgets/ColorFilter";
import PriceFilter from "../widgets/PriceFilter";
import SizeFilter from "../widgets/SizeFilter";

const Sidebar = ({ sidebarAction, sidebar }) => {
   const ref = useRef();
   const [showSidebar, setShowSidebar] = useState(false);

   const toogleSidebar = () => {
      setShowSidebar(!showSidebar);
      sidebarAction();
   };

   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         // If the menu is open and the clicked target is not within the menu,
         // then close the menu
         if (showSidebar && ref.current && !ref.current.contains(e.target)) {
            setShowSidebar(false);
            sidebarAction();
         }
      };

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [showSidebar]);

   useEffect(() => {
      if (sidebar) {
         setShowSidebar(true);
      } else {
         setShowSidebar(false);
      }
   }, [sidebar]);

   return (
      <div
         ref={ref}
         className={` ${showSidebar ? "sidebar-slide-left" : "sidebar-slide-right"
            } absolute top-0 right-0 z-10 bg-white flex-col min-w-[300px] md:relative md:flex`}>
         <div
            onClick={toogleSidebar}
            className="absolute top-0 -left-4 bg-primary text-white p-2 rounded-full cursor-pointer md:hidden">
            <AiOutlineClose />
         </div>
         <CategoryFilter />
         <PriceFilter />
         <ColorFilter />
         <SizeFilter />
      </div>
   );
};

export default Sidebar;
