import { motion } from "framer-motion";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";

const categories = [
   {
      id: 1,
      name: "Tops",
      href: "/",
   },
   {
      id: 2,
      name: "Printed T-shirts",
      href: "/",
   },
   {
      id: 3,
      name: "Plain T-shirts",
      href: "/",
   }
];

const CategoryFilter = () => {
   const [show, setShow] = useState(true);
   return (
      <div>
         {/* Widget Header  */}
         <div className="border border-border border-t-0 px-7 py-5 flex justify-between items-center">
            <p className="text-lg font-caustenbold text-secondary leading-tight">
               Filter
            </p>
            <GiSettingsKnobs
               onClick={() => setShow(!show)}
               className="text-lg cursor-pointer"
            />
         </div>
         {/* End Widget Header  */}

         {/* Widget Body  */}
         <motion.div
            initial={{ display: "none" }}
            animate={{
               display: show ? "block" : "none",
            }}
            transition={{ duration: 0.5 }}
            className="border border-border border-t-0 px-7 py-5"
         >
            <ul className="flex flex-col gap-4">
               {categories.map((category) => (
                  <li key={category.id}>
                     <a
                        href={category.href}
                        className="flex justify-between items-center"
                     >
                        <span className="font-caustensemi_bold text-secondary">
                           {category.name}
                        </span>
                        <BsChevronRight className="text-secondary" />
                     </a>
                  </li>
               ))}
            </ul>
         </motion.div>
      </div>
   );
};

export default CategoryFilter;
