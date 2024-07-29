import { BsArrowRight } from "react-icons/bs";

const Sizes = () => {
   return (
      <div>
         <div className="flex items-center gap-6">
            <p className="text-lg font-caustensemi_bold text-primary">
               Select Size
            </p>
            <p className="text-lg font-caustensemi_bold flex items-center gap-3 text-secondary cursor-pointer">
               <span>Size Guide</span>
               <BsArrowRight />
            </p>
         </div>
         <div className="flex gap-6 items-center mt-5">
            <button className="border border-border rounded-xl text-sm text-primary w-10 h-10 font-caustenmedium hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out">
               XS
            </button>
            <button className="border border-border rounded-xl text-sm text-primary w-10 h-10 font-caustenmedium hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out">
               S
            </button>
            <button className="border border-border rounded-xl text-sm text-primary w-10 h-10 font-caustenmedium hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out">
               M
            </button>
            <button className="border border-primary rounded-xl text-sm text-white w-10 h-10 font-caustenmedium bg-primary hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out">
               L
            </button>
            <button className="border border-border rounded-xl text-sm text-primary w-10 h-10 font-caustenmedium hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out">
               XL
            </button>
         </div>
      </div>
   );
};

export default Sizes;
