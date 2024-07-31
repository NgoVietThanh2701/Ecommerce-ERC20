import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import images from "../../assets/shop/img";
import { Link } from "react-router-dom";

const slideImages = [
   {
      id: 1,
      image: images.heroSlide1,
      subHeading: "T-shirt / Tops",
      heading: "Summer <br/>Value Pack",
      description: "cool / colorful / comfy",
      button: "Shop Now",
      link: "#",
   },
   {
      id: 2,
      image: images.heroSlide1,
      subHeading: "T-shirt / Tops",
      heading: "Summer <br/>Value Pack",
      description: "cool / colorful / comfy",
      button: "Shop Now",
      link: "#",
   },
];

const Hero = () => {
   return (
      <section>
         <Slide>
            {slideImages.map((slide) => (
               <div
                  key={slide.id}
                  className="md:h-[400px] lg:h-[600px] xl:h-[716px] bg-no-repeat bg-top flex items-center py-10 bg-cover md:py-0"
                  style={{ backgroundImage: `url(${slide.image})` }}
               >
                  <div className="container text-white">
                     <div className="px-6 flex flex-col items-start gap-2 md:gap-5 lg:gap-10">
                        <h4 className="font-core_sans_medium text-lg md:text-2xl">
                           {slide.subHeading}
                        </h4>
                        <h1
                           className="text-2xl md:text-3xl lg:text-5xl font-core_sans_heavy leading-tight"
                           dangerouslySetInnerHTML={{ __html: slide.heading }}
                        ></h1>
                        <h4 className="font-core_sans_medium text-lg md:text-2xl">
                           {slide.description}
                        </h4>
                        <Link
                           to={slide.link}
                           className="font-caustenbold text-lg md:text-xl px-10 md:px-16 py-2 md:py-3 text-primary bg-white rounded-md"
                        >
                           {slide.button}
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </Slide>
      </section>
   );
};

export default Hero;
