import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

import fakeData from "../fakeData.js";

const ListingGrid = ({ products }) => {
   const getBrand = (id) => {
      const brand = fakeData.brands.find((brand) => brand.id === id);
      return brand ? brand.name : "Unknown Brand";
   };
   return products.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
         {products.map((product) => (
            <div className="relative flex flex-col gap-5" key={product.id}>
               <div className="absolute top-5 right-5 bg-white rounded-full p-2">
                  <AiOutlineHeart className="cursor-pointer" />
               </div>
               <Link
                  to={`/products/${product.id}`}
                  className="text-black rounded-lg overflow-hidden w-full"
               >
                  <img src={product.images[0]} alt="product" className="w-full" />
               </Link>
               <div className="meta flex justify-between items-center">
                  <div>
                     <Link to={`/products/${product.id}`}>
                        <p className="font-caustenbold text-[#2A2f2f]">
                           {product.name}
                        </p>
                     </Link>
                     <Link
                        to={`/brand/${product.brand}`}
                        className="text-sm font-caustenmedium text-[#7f7f7f]"
                     >
                        {getBrand(product.brand)}
                     </Link>
                  </div>
                  <span className="px-5 py-1 bg-grayBG rounded-full text-sm">
                     ${product.price}.00
                  </span>
               </div>
            </div>
         ))}
      </div>
   ) : (
      <div>
         <h3 className="text-3xl font-caustenbold text-center text-secondary">
            Sorry! No products found.
         </h3>
      </div>
   );
};

export default ListingGrid;
