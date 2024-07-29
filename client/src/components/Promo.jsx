import { useRef } from "react";
import { useInView } from "framer-motion";
import images from "../assets/img";

const Promo = () => {
   const ref = useRef();
   const isInView = useInView(ref, { once: true });

   return (
      <section className="pt-20 pb-10">
         <div className="container overflow-hidden">
            <div className="flex flex-col  gap-10 md:flex-row md:justify-between ">
               <div
                  ref={ref}
                  style={{
                     transform: isInView ? "translateX(0)" : "translateX(-100%)",
                     transition: "transform 0.8s ease-in-out",
                     backgroundImage: `url(${images.promoOne})`,
                  }}
                  className="bg-no-repeat bg-cover bg-center py-16 px-6 text-white w-full flex flex-col items-start gap-8 rounded-md overflow-hidden"
               >
                  <p className="font-core_sans_heavy">Low Price</p>
                  <div>
                     <h3 className="text-3xl font-core_sans_extrabold">
                        High Coziness
                     </h3>
                     <p className="font-core_sans_medium">UPTO 50% OFF</p>
                  </div>
                  <a href="#" className="underline font-core_sans_heavy">
                     Explore Items
                  </a>
               </div>
               <div
                  ref={ref}
                  style={{
                     transform: isInView ? "translateX(0)" : "translateX(100%)",
                     transition: "transform 0.8s ease-in-out",
                     backgroundImage: `url(${images.promoTwo})`,
                  }}
                  className="bg-no-repeat bg-cover bg-center py-16 px-6 text-white w-full flex flex-col items-start gap-8 rounded-md overflow-hidden"
               >
                  <p className="font-core_sans_heavy">Beyoung Presents</p>
                  <div>
                     <h3 className="text-3xl font-core_sans_extrabold">
                        Breezy Summer <br />
                        Style
                     </h3>
                     <p className="font-core_sans_medium">UPTO 50% OFF</p>
                  </div>
                  <a href="#" className="underline font-core_sans_heavy">
                     Explore Items
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Promo;
