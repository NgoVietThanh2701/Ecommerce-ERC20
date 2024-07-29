import { BsArrowDownShort } from "react-icons/bs";
import images from "../assets/img";
import { useRef } from "react";
import { useInView } from "framer-motion";

const savingData = [
   {
      id: 1,
      img: images.savingOne,
      title: "Hawaiian <br/>Shirts",
      desc: "Dress up in summer vibe",
      discount: "UPTO 50% OFF",
      link: "#",
      button: "SHOP NOW",
      align: "start",
      color: "secondary",
   },
   {
      id: 2,
      img: images.savingTwo,
      title: "Printed <br/>T-Shirt",
      desc: "New Designs Every Week",
      discount: "UPTO 40% OFF",
      link: "#",
      button: "SHOP NOW",
      align: "end",
      color: "secondary",
   },
   {
      id: 3,
      img: images.savingThree,
      title: "Cargo <br/>Joggers",
      desc: "Move with style & comfort",
      discount: "UPTO 50% OFF",
      link: "#",
      button: "SHOP NOW",
      align: "end",
      color: "primary",
   },
];

const savingData2 = [
   {
      id: 1,
      img: images.SavingBigOne,
      title: "Urban <br/>Shirts",
      desc: "Live In Confort",
      discount: "FLAT 60% OFF",
      link: "#",
      button: "SHOP NOW",
      align: "end",
      color: "primary",
   },
   {
      id: 2,
      img: images.SavingBigTwo,
      title: "Oversized <br/>T-Shirt",
      desc: "Street Style Icon",
      discount: "FLAT 60% OFF",
      link: "#",
      button: "SHOP NOW",
      align: "end",
      color: "primary",
   },
];

const SavingZone = () => {
   const ref = useRef();
   const bigSize = useRef();
   const isInView = useInView(ref, { once: true });
   const isInViewBig = useInView(bigSize, { once: true });
   return (
      <section className="py-10 ">
         <div className="container">
            <div className="section_heading flex justify-start items-center gap-5">
               <div className="w-[7px] h-8 rounded-md bg-blueBar"></div>
               <h3 className="text-3xl font-core_sans_bold">Big Saving Zone</h3>
            </div>
            {/* First Section  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
               {savingData.map((item) => (
                  <div
                     ref={ref}
                     style={{
                        transform: isInView ? "none" : "scale(0.2)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        backgroundImage: `url(${item.img})`,
                     }}
                     key={item.id}
                     className={`w-full rounded-md overflow-hidden bg-cover bg-no-repeat bg-center py-16 px-4 ${item.color === "primary" ? "text-primary" : "text-white"
                        }`}
                  >
                     <div
                        className={`flex flex-col gap-4 ${item.align === "start"
                           ? "items-start text-start"
                           : "items-end text-right"
                           }`}
                     >
                        <h4
                           className="text-2xl font-core_sans_bold leading-tight"
                           dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h4>
                        <div
                           className={`w-full flex flex-col ${item.align === "start" ? "items-start" : "items-end"
                              } gap-1`}
                        >
                           <p className="text-sm font-caustensemi_bold">{item.desc}</p>
                           <p className="font-causten_bold">{item.discount}</p>
                        </div>
                        <div className="flex flex-col items-start">
                           <BsArrowDownShort className="text-3xl block mx-auto mb-5" />
                           <a
                              href={item.link}
                              className={`${item.color === "primary"
                                 ? "btn_sm_primary"
                                 : "btn_sm_secondary"
                                 } font-caustensemi_bold}`}
                           >
                              {item.button}
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            {/* Last Section  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5">
               {savingData2.map((item) => (
                  <div
                     ref={bigSize}
                     style={{
                        transform: isInViewBig ? "none" : "scale(0.2)",
                        opacity: isInViewBig ? 1 : 0,
                        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        backgroundImage: `url(${item.img})`,
                     }}
                     key={item.id}
                     className={`w-full rounded-md overflow-hidden  bg-cover bg-no-repeat bg-center py-16 px-16 ${item.color === "primary" ? "text-primary" : "text-white"
                        }`}
                  >
                     <div
                        className={`flex flex-col gap-4 ${item.align === "start"
                           ? "items-start text-start"
                           : "items-end text-right"
                           }`}
                     >
                        <h4
                           className="text-2xl font-core_sans_bold leading-tight"
                           dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h4>
                        <div
                           className={`w-full flex flex-col ${item.align === "start" ? "items-start" : "items-end"
                              } gap-1`}
                        >
                           <p className="text-sm font-caustensemi_bold">{item.desc}</p>
                           <p className="font-causten_bold">{item.discount}</p>
                        </div>
                        <div className="flex flex-col items-start">
                           <BsArrowDownShort className="text-3xl block mx-auto mb-5" />
                           <a
                              href={item.link}
                              className={`${item.color === "primary"
                                 ? "btn_sm_primary"
                                 : "btn_sm_secondary"
                                 } font-caustensemi_bold}`}
                           >
                              {item.button}
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SavingZone;
