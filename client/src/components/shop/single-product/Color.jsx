import { useState } from "react";

const Color = () => {
   const [color, setColor] = useState("black");
   return (
      <div>
         <label className="text-lg font-caustensemi_bold text-primary">
            Colours Available
         </label>
         <div className="flex gap-5 items-center mt-5">
            <div className="flex items-center mb-4">
               <input
                  id="black"
                  type="radio"
                  name="radio"
                  className="hidden peer/black"
                  value="black"
                  onClick={(e) => setColor(e.target.value)}
               />
               <label
                  htmlFor="black"
                  className="flex items-center cursor-pointer text-xl bg-black rounded-full peer-checked/black:ring-offset-2 peer-checked/black:ring-1 peer-checked/black:ring-primary"
               >
                  <span className="w-8 h-8 inline-block rounded-full  flex-no-shrink"></span>
               </label>
            </div>
            <div className="flex items-center mb-4">
               <input
                  id="orange"
                  type="radio"
                  name="radio"
                  className="hidden peer/orange"
                  value="orange"
                  onClick={(e) => setColor(e.target.value)}
               />
               <label
                  htmlFor="orange"
                  className="flex items-center cursor-pointer text-xl bg-orange-500 rounded-full peer-checked/orange:ring-offset-2 peer-checked/orange:ring-1 peer-checked/orange:ring-primary"
               >
                  <span className="w-8 h-8 inline-block rounded-full  flex-no-shrink"></span>
               </label>
            </div>
            <div className="flex items-center mb-4">
               <input
                  id="gray"
                  type="radio"
                  name="radio"
                  className="hidden peer/gray"
                  value="gray"
                  onClick={(e) => setColor(e.target.value)}
               />
               <label
                  htmlFor="gray"
                  className="flex items-center cursor-pointer text-xl bg-gray-500 rounded-full peer-checked/gray:ring-offset-2 peer-checked/gray:ring-1 peer-checked/gray:ring-primary"
               >
                  <span className="w-8 h-8 inline-block rounded-full  flex-no-shrink"></span>
               </label>
            </div>
            <div className="flex items-center mb-4">
               <input
                  id="red"
                  type="radio"
                  name="radio"
                  className="hidden peer/red"
                  value="red"
                  onClick={(e) => setColor(e.target.value)}
               />
               <label
                  htmlFor="red"
                  className="flex items-center cursor-pointer text-xl bg-red-500 rounded-full peer-checked/red:ring-offset-2 peer-checked/red:ring-1 peer-checked/black:ring-primary"
               >
                  <span className="w-8 h-8 inline-block rounded-full  flex-no-shrink"></span>
               </label>
            </div>
         </div>
      </div>
   );
};

export default Color;
