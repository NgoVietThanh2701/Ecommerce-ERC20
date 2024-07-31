import { useState } from "react";
import { motion } from "framer-motion";
import { BsChevronUp as ChevronUp, BsChevronDown } from "react-icons/bs";

const ColorFilter = () => {
   const [show, setShow] = useState(true);
   return (
      <div>
         {/* Widget Header  */}
         <div className="border border-border border-t-0 px-7 py-5 flex justify-between items-center">
            <p className="text-lg font-caustenbold text-secondary leading-tight">
               Colors
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
            <div className="grid grid-cols-4 gap-5">
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#8434E1]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Purple</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#252525]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Black</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#F35528]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Red</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#F16F2B]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Orange</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#345EFF]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Navy</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-grey-100"></div>
                  <p className="text-sm text-secondary font-caustenbold">White</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#D67E3B]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Broom</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#48BC4E]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Green</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#FDC761]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Yellow</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#E4E5E8]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Grey</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#E08D9D]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Pink</p>
               </button>
               <button className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#3FDEFF]"></div>
                  <p className="text-sm text-secondary font-caustenbold">Blue</p>
               </button>
            </div>
         </motion.div>
         {/* End Widget Body  */}
      </div>
   );
};

export default ColorFilter;
