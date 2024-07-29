import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { ImLoop2 } from "react-icons/im";
import Ratings from "../components/single-product/Ratings";
import Sizes from "../components/single-product/Sizes";
import Color from "../components/single-product/Color";
import CartButton from "../components/single-product/CartButton";
import ProductDescription from "../components/single-product/ProductDescription";
import Breadcrumb from "../components/Breadcrumb";

import fakeData from "../fakeData";
import Loader from "../components/Loader";

const breadcrumbLinks = [
   {
      id: 1,
      text: "Shop",
      url: "/products",
   },
   {
      id: 2,
      text: "Women",
      url: "/women",
   },
   {
      id: 3,
      text: "Top",
      url: "/top",
   },
];

const SingleProduct = () => {

   const { id } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const [product, setProduct] = useState(null);
   const [featuredImage, setFeaturedImage] = useState(null);

   const getCategory = (id) => {
      const category = fakeData.categories.find((category) => category.id == id);
      return category ? category.name : "";
   };

   const getBrand = (id) => {
      const brand = fakeData.brands.find((brand) => brand.id == id);
      return brand ? brand.name : "";
   };

   useEffect(() => {
      setIsLoading(true);
      if (id && fakeData.products.find((product) => product.id == id)) {
         setProduct(fakeData.products.find((product) => product.id == id));
         setFeaturedImage(fakeData.products.find((product) => product.id == id).images[0]);
         setIsLoading(false);
      } else {
         setIsLoading(false);
         setProduct(null);
         navigate("/");
      }
   }, [id, navigate]);

   return (
      <>
         {isLoading ? (
            <Loader />
         ) : (
            <section className="border-0 border-t">
               <div className="container">
                  <div className="flex flex-col gap-14 md:justify-between md:flex-row">
                     {/* Left Section  */}
                     <div className="flex items-center w-full md:w-1/2 gap-8 ">
                        <div className="flex flex-col items-center w-[75px] gap-2">
                           {/* Product Images  */}
                           {product?.images.map((image, index) => (
                              <img
                                 key={index}
                                 src={image}
                                 onClick={() => setFeaturedImage(image)}
                                 alt={product.name}
                                 className="w-[68px] h-[68px] cursor-pointer object-cover rounded-md"
                              />
                           ))}
                        </div>
                        <div className="w-full h-full">
                           <img
                              src={featuredImage}
                              alt="Featured Image"
                              className="w-full object-contain"
                           />
                        </div>
                     </div>
                     {/* End Left Section  */}

                     {/* Right Section  */}
                     <div className="w-full md:w-1/2">
                        <div className="w-full md:w-4/5 flex flex-col gap-6 pt-10">
                           <Breadcrumb links={breadcrumbLinks} />
                           <h2 className="text-3xl font-core_sans_bold leading-tight text-primary">
                              {product?.name}
                           </h2>
                           {/* Ratings  */}
                           <Ratings />
                           {/* Sizes  */}
                           <Sizes />
                           {/* Colors  */}
                           <Color />

                           {/* Price  */}
                           <CartButton product={product} />
                        </div>
                        <hr className="my-10 h-1" />
                        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
                           <div className="text-secondary flex items-center gap-6">
                              <div className="bg-grayBG rounded-full p-4">
                                 <MdOutlinePayment className="text-lg" />
                              </div>
                              <p className="text-lg font-caustenmedium">Secure payment</p>
                           </div>
                           <div className="text-secondary flex items-center gap-6">
                              <div className="bg-grayBG rounded-full p-4">
                                 <IoShirtOutline className="text-lg" />
                              </div>
                              <p className="text-lg font-caustenmedium">Size & Fit</p>
                           </div>
                           <div className="text-secondary flex items-center gap-6">
                              <div className="bg-grayBG rounded-full p-4">
                                 <BsTruck className="text-lg" />
                              </div>
                              <p className="text-lg font-caustenmedium">Free shipping</p>
                           </div>
                           <div className="text-secondary flex items-center gap-6">
                              <div className="bg-grayBG rounded-full p-4">
                                 <ImLoop2 className="text-lg" />
                              </div>
                              <p className="text-lg font-caustenmedium">
                                 Free Shipping & Returns
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* End Right Section  */}
                  </div>

                  {/* Description  */}
                  <ProductDescription />
               </div>
            </section>
         )}
      </>
   )
}

export default SingleProduct