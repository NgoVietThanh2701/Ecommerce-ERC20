import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "toolcool-range-slider";

import {
   BsChevronUp as ChevronUp,
   BsCurrencyDollar,
   BsChevronDown,
} from "react-icons/bs";

const PriceFilter = () => {
   const slideRef = useRef(null);

   const [min, setMin] = useState(100);
   const [max, setMax] = useState(500);

   const [show, setShow] = useState(true);

   useEffect(() => {
      slideRef.current.addEventListener("change", (e) => {
         setMin(e.detail.value);
         setMax(e.detail.value2);
      });
   }, []);
   return (
      <div className="relative w-full">
         {/* Widget Header  */}
         <div className="border border-border border-t-0 px-7 py-5 flex justify-between items-center">
            <p className="text-lg font-caustenbold text-secondary leading-tight">
               Price
            </p>
            <button onClick={() => setShow(!show)}>
               {show ? (
                  <ChevronUp className="text-lg cursor-pointer" />
               ) : (
                  <BsChevronDown className="text-lg cursor-pointer" />
               )}
            </button>
         </div>
         {/* End Widget Header  */}

         {/* Widget Body  */}
         <motion.div
            initial={{ display: "none" }}
            animate={{
               display: show ? "block" : "none",
            }}
            transition={{ duration: 0.5 }}
            className=" border border-border border-t-0 px-7 pt-10 pb-8 text-secondary"
         >
            <toolcool-range-slider
               ref={slideRef}
               min="10"
               max="1000"
               value={min}
               value2={max}
               step="1"
               slider-bg-fill="#8A33FD"
            ></toolcool-range-slider>
            <div className="flex justify-between items-center mt-8">
               <div className="relative">
                  <input
                     type="number"
                     value={min}
                     onChange={(e) => setMin(e.target.value)}
                     className="w-[95px] border border-border rounded-md px-3 py-2 text-sm text-center"
                  />
                  <BsCurrencyDollar className="absolute top-3 left-2" />
               </div>
               <div className="relative">
                  <input
                     type="number"
                     onChange={(e) => setMax(e.target.value)}
                     value={max}
                     className="w-[95px] border border-border rounded-md px-3 py-2 text-sm text-center"
                  />
                  <BsCurrencyDollar className="absolute top-3 left-2" />
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default PriceFilter;
