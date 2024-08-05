import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";

import fakeData from "../../utils/fakeData";

const filteredCategories = fakeData.categories.filter(
   (category) => category.parent !== ""
);

const Carousel = () => {
   const ref = useRef();
   const isInView = useInView(ref, { once: true });

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
         {
            breakpoint: 1240,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 978,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 1,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 1,
            },
         },
      ],
   };
   return (
      <section className="py-10 ">
         <div className="container">
            <div className="section_heading flex justify-start items-center gap-5">
               <div className="w-[7px] h-8 rounded-md bg-blueBar"></div>
               <h3 className="text-3xl font-core_sans_bold">New Arrival</h3>
            </div>
            <div
               ref={ref}
               style={{
                  transform: isInView ? "none" : "scale(1.2)",
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
               }}
            >
               <Slider {...settings} className="mt-14">
                  {filteredCategories.map((item) => (
                     <Link to={`#`} key={item.id} className="pr-7">
                        <div className="w-full rounded-md overflow-hidden mb-8">
                           <img
                              src={item.image}
                              alt="new Arrival"
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <p className="text-lg font-caustenbold text-center md:text-left">
                           {item.name}
                        </p>
                     </Link>
                  ))}
               </Slider>
            </div>
         </div>
      </section>
   );
};

export default Carousel;

const SampleNextArrow = (props) => {
   const { onClick } = props;
   return (
      <div
         className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 text-gray-700" onClick={onClick}>
         <BsArrowLeft size={22} />
      </div>
   )
}

const SamplePrevArrow = (props) => {
   const { onClick } = props;
   return (
      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 text-gray-700" onClick={onClick}>
         <BsArrowRight size={22} />
      </div>
   )
}
