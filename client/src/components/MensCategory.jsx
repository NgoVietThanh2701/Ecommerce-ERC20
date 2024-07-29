import { useRef } from "react";
import CategoryGrid from "./CategoryGrid.jsx";
import { useInView } from "framer-motion";
import fakeData from "../fakeData.js";

const mensCategories = fakeData.categories.filter((category) => category.parent === 13);

const MensCategory = () => {
   const ref = useRef();
   const isInView = useInView(ref, { once: true });
   return (
      <section className="my-20 ">
         <div
            className="container"
            ref={ref}
            style={{
               transform: isInView ? "translateY(0)" : "translateY(20%)",
               opacity: isInView ? 1 : 0,
               transition: "transform 0.5s ease-in-out",
            }}
         >
            <div className="section_heading flex justify-start items-center gap-5">
               <div className="w-[7px] h-8 rounded-md bg-blueBar"></div>
               <h3 className="text-3xl font-core_sans_bold">Categories For Men</h3>
            </div>
            <div className="mt-10">
               <CategoryGrid categories={mensCategories} />
            </div>
         </div>
      </section>
   );
};

export default MensCategory;
