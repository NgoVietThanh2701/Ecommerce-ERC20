import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import images from "../assets/img";

const CallToAction = () => {
   const ref = useRef();
   const rightRef = useRef();
   const isInView = useInView(ref, { once: false });
   const isInViewRight = useInView(rightRef, { once: false });
   return (
      <section className="cta mt-10 mb-20">
         <div className="container">
            <div className="grid grid-cols-1 rounded-xl overflow-hidden gap-0 items-center md:grid-cols-2 ">
               <div
                  ref={ref}
                  style={{
                     transform: isInView ? "translateX(0)" : "translateX(-100%)",
                     opacity: isInView ? 1 : 0,
                     transition: "transform 0.8s ease-in-out",
                     backgroundImage: `url(${images.CtaOne})`,
                  }}
                  className="bg-cover h-full relative bg-no-repeat bg-center px-14 py-14 text-white flex flex-col justify-center gap-8"
               >
                  <h3 className="text-3xl font-core_sans_heavy">
                     WE MADE YOUR EVERYDAY FASHION BETTER!
                  </h3>
                  <p className="font-caustenlight text-lg leading-tight">
                     In our journey to improve everyday fashion, euphoria presents
                     EVERYDAY wear range - Comfortable & Affordable fashion 24/7
                  </p>
                  <Link
                     to={"/products"}
                     className="px-6 py-2 rounded-md text-primary bg-white block self-start"
                  >
                     Shop Now
                  </Link>
               </div>
               <div
                  className="h-full"
                  ref={rightRef}
                  style={{
                     transform: isInViewRight ? "translateX(0)" : "translateX(100%)",
                     opacity: isInViewRight ? 1 : 0,
                     transition: "transform 0.8s ease-in-out",
                  }}
               >
                  <img src={images.CtaTwo} alt="" className="w-full h-full object-cover" />
               </div>
            </div>
         </div>
      </section>
   );
};

export default CallToAction;
