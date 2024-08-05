import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const ListingGrid = ({ products }) => {

   return products.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
         {products.map((product, index) => (
            <div className="relative flex flex-col gap-5" key={index}>
               <div className="absolute top-5 right-5 bg-white rounded-full p-2">
                  <AiOutlineHeart className="cursor-pointer" />
               </div>
               <Link
                  to={`./${product.productDetails.code}`}
                  className="text-black rounded-lg overflow-hidden w-full"
               >
                  <img src={product.productDetails.image} alt="product" className="w-full" />
               </Link>
               <div className="meta flex justify-between items-center">
                  <div>
                     <Link to={''}>
                        <p className="font-caustenbold text-[#2A2f2f]">
                           {product.productDetails.name}
                        </p>
                     </Link>
                     <Link
                        to={``}
                        className="text-sm font-caustenmedium text-[#7f7f7f]"
                     >
                        {product.seller.addressShop}
                     </Link>
                  </div>
                  <span className="px-5 py-1 bg-grayBG rounded-full text-sm">
                     ${product.productDetails.price}.00
                  </span>
               </div>
            </div>
         ))
         }
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
