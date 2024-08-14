import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { ImLoop2 } from "react-icons/im";
import Ratings from "../../components/shop/single-product/Ratings";
import Sizes from "../../components/shop/single-product/Sizes";
import ProductDescription from "../../components/shop/single-product/ProductDescription";
import Breadcrumb from "../../components/shop/Breadcrumb";
import Loader from "../../components/shop/Loader";
import ProductContract from "../../contracts/Product.contract.ts";
import toast, { Toaster } from 'react-hot-toast';
import { Select } from "@material-tailwind/react";
import { getAbiProduct, PRODUCT_ADDRESS } from "../../contracts/config.ts";
import { ethers } from "ethers";
import Loading from "../../components/dashboard/Loading.jsx";
import LCKContract from "../../contracts/LCK.contract.ts";
import { formatToEth } from "../../utils/functionUtils.js";

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

   const { web3Provider } = useOutletContext();

   const { id } = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [product, setProduct] = useState(null);
   const [shippers, setShippers] = useState([]);
   const [featuredImage, setFeaturedImage] = useState(null);

   const [shipper, setShipper] = useState("");

   const getProductByCode = async () => {
      if (id) {
         try {
            const productContract = new ProductContract();
            const product = await productContract.getProductByCode(id);
            setProduct(convertObjectProduct(product));
            setIsLoading(false);
         } catch (error) {
            console.log(error)
         }
      }
   }

   const getListShipper = async () => {
      try {
         const productContract = new ProductContract();
         const shipperList = await productContract.getShippers();
         const listShippers = [];
         for (let i = 0; i < shipperList.length; i++) {
            listShippers.push(convertObjShipper(shipperList[i]));
         }
         setShippers(listShippers);
      } catch (error) {
         console.log(error)
      }
   }

   const convertObjShipper = (data) => {
      return {
         feeShip: formatToEth(data.feeShip),
         name: data.name,
         shipperAddress: data.shipperAddress
      }
   }

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
            price: formatToEth(data.productDetails.price),
            size: data.productDetails.size,
         },
         seller: {
            addressShop: data.seller.addressShop,
            name: data.seller.name,
            sellerAddress: data.seller.sellerAddress
         },
      }
   }

   useEffect(() => {
      getProductByCode();
      getListShipper();
   }, []);

   const handleBuyProduct = async () => {
      if (!shipper) {
         toast.error("Chọn hình thức vận chuyển", { position: "top-center" });
      }
      if (web3Provider && product) {
         try {
            setIsLoading(true);
            const productContract = new ProductContract(web3Provider);
            const shipperInfo = await productContract.getShipperByAddress(shipper);
            const amountTotal = formatToEth(shipperInfo.feeShip) + product.productDetails.price;
            const lckContract = new LCKContract(web3Provider);
            await lckContract.approve(productContract._contractAddress, amountTotal);
            await productContract.purchasedProduct(product.uid, shipper);
            listenEvent();
         } catch (error) {
            console.log(error)
            setIsLoading(false)
         }
      }
   }

   const navigate = useNavigate();

   const listenEvent = () => {
      let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
      contract.once("PurchasedByConsumer", (uid) => {
         setIsLoading(false);
         toast.success("Success", { position: "top-center" });
         navigate('/')
      })
   }

   return (
      <>

         <section className="border-0 border-t">
            {isLoading &&
               <Loading />
            }
            {product ? <div className="container">
               <div className="flex flex-col gap-14 md:justify-between md:flex-row">
                  {/* Left Section  */}
                  <div className="flex items-center w-full md:w-1/2 gap-8 ">
                     <div className="flex flex-col items-center w-[75px] gap-2">
                        <img
                           src={product.productDetails.image}
                           onClick={() => setFeaturedImage(product.productDetails.image)}
                           alt={product.name}
                           className="w-[68px] h-[68px] cursor-pointer object-cover rounded-md"
                        />
                     </div>
                     <div className="w-full h-full">
                        <img
                           src={product.productDetails.image}
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
                           {product?.productDetails.name} - ${product?.productDetails.price}
                        </h2>
                        {/* Ratings  */}
                        <Ratings />
                        {/* Sizes  */}
                        <Sizes />
                        {/* Colors  */}
                        <div>
                           <select className="mt-1 text-base" onChange={(e) => setShipper(e.target.value)}>
                              <option value=''>Chọn hình thức vận chuyển</option>
                              {shippers && shippers.map((shipper, index) => (
                                 <option key={index} value={shipper.shipperAddress}>{shipper.name} - ${shipper.feeShip}</option>
                              ))}
                           </select>
                        </div>

                        {/* Price  */}
                        <button onClick={handleBuyProduct} type="button" className="text-white text-base w-[200px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mua ngay</button>
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
            </div> : "Ko co san pham"}
            <Toaster />
         </section>
      </>
   )
}

export default SingleProduct