import React, { useEffect } from 'react'
import { useState } from 'react';
import Sidebar from '../../components/shop/default/Sidebar.jsx';
import ListingGrid from '../../components/shop/ListingGrid.jsx';
import { CiFilter } from "react-icons/ci";
import Pagination from "../../components/shop/Pagination.jsx";
import fakeData from "../../utils/fakeData.js";
import ProductContract from '../../contracts/Product.contract.ts';
import { useOutletContext } from 'react-router-dom';
import { rpcProvider } from '../../contracts/config.ts';

const Products = () => {

   const { address } = useOutletContext();

   const [sidebar, setSidebar] = useState(false);
   const toogleSidebar = () => {
      setSidebar(!sidebar);
   };

   const [products, setProducts] = useState([]);

   const getProducts = async () => {
      const productContract = new ProductContract();
      const productList = await productContract.getProducts();
      const listProducts = [];
      console.log(productList)
      for (let i = 0; i < productList.length - 1; i++) {
         if (productList[i].shipper.shipperAddress === "0x0000000000000000000000000000000000000000") {
            listProducts.push(convertObjectProduct(productList[i]));
         }
      }
      setProducts(listProducts.reverse());
   }

   console.log(products)

   const convertObjectProduct = (data) => {
      return {
         uid: data.uid.toNumber(),
         consumer: data.consumer,
         owner: data.owner,
         productDetails: {
            code: data.productDetails.code.toString(),
            date: data.productDetails.date.toNumber(),
            description: data.productDetails.description,
            image: data.productDetails.image,
            name: data.productDetails.name,
            price: data.productDetails.price.toNumber(),
            size: data.productDetails.size,
         },
         seller: {
            addressShop: data.seller.addressShop,
            name: data.seller.name,
            sellerAddress: data.seller.sellerAddress
         }
      }
   }

   useEffect(() => {
      getProducts();
   }, [])

   return (
      <section className="product-page broder-0 border-t border-border">
         <div className="container">
            <div className="flex justify-between gap-14">
               {/* Sidebar  */}
               <Sidebar sidebarAction={toogleSidebar} sidebar={sidebar} />
               {/* End Sidebar  */}

               {/* Products  */}
               <div className=" py-14 w-full">
                  {/* Heading  */}
                  <div className="flex flex-col justify-between items-center w-full mb-10 md:flex-row">
                     <p className="text-lg font-caustenbold text-primary">
                        All Products
                     </p>
                     <div className="flex gap-5 items-center">
                        <button className="text-lg font-caustenbold text-blueBar">
                           New
                        </button>
                        <button className="text-lg font-caustenbold text-primary">
                           Recommended
                        </button>
                        <CiFilter
                           onClick={toogleSidebar}
                           className="text-lg text-primary cursor-pointer md:hidden"
                        />
                     </div>
                  </div>
                  {/* End Heading  */}

                  {/* Product Grid  */}
                  <ListingGrid products={products} />
                  {/* End Product Grid  */}

                  <button className="block mx-auto font-caustenbold text-lg md:text-xl px-10 md:px-16 py-2 md:py-3 text-white bg-primary rounded-md my-10 hover:text-white hover:bg-blueBar transition-colors duration-200 ease-in-out">
                     Load More
                  </button>
                  <Pagination />
               </div>
               {/* End Products  */}
            </div>
         </div>
      </section>
   )
}

export default Products