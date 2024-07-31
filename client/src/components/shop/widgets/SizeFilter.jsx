import { useState } from "react";
import { motion } from "framer-motion";
import { BsChevronUp as ChevronUp, BsChevronDown } from "react-icons/bs";

const SizeFilter = () => {
   const [show, setShow] = useState(true);
   return (
      <div>
         {/* Widget Header  */}
         <div className="border border-border border-t-0 px-7 py-5 flex justify-between items-center">
            <p className="text-lg font-caustenbold text-secondary leading-tight">
               Size
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
            className="border border-border border-t-0 px-7 pt-10 pb-8"
         >
            <div className="grid grid-cols-3 gap-5">
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  XXS
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  XL
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  XS
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  S
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  M
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  L
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  XXL
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  3XL
               </span>
               <span className="text-sm font-caustensemi_bold px-3 py-1 cursor-pointer border border-border rounded-lg text-primary text-center">
                  4XL
               </span>
            </div>
         </motion.div>
      </div>
   );
};

export default SizeFilter;
