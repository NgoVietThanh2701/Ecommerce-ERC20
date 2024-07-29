import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

import Breadcrumb from "../components/Breadcrumb";
import images from "../assets/img";

const links = [
   {
      id: 1,
      url: "/",
      text: "Home",
   },
   {
      id: 2,
      url: "/cart",
      text: "Add To Cart",
   },
];

const CartPage = () => {
   return (
      <>
         <section>
            {/* breadcrumb  */}
            <div className="container mt-10">
               <Breadcrumb links={links} />
               <p className="text-sm font-caustenregular text-secondary">
                  Please fill in the fields below and click place order to complete
                  your purchase!
               </p>
               <p className="text-sm font-caustenregular text-secondary">
                  Already registered?{" "}
                  <Link className="text-blueBar" to={"/login"}>
                     Please login here
                  </Link>
               </p>
            </div>

            {/* cart  */}
            <div className="mt-10">
               <div className="container">
                  <table className="cart-table table-auto w-full md:rounded-xl md:overflow-hidden">
                     <thead className="text-[18px] font-caustensemi_bold bg-primary text-white uppercase h-[74px]">
                        <tr className="text-left ">
                           <th className="px-2 md:px-6">Product Details</th>
                           <th className="hidden md:table-cell px-2 md:px-6">Price</th>
                           <th className="hidden md:table-cell px-2 md:px-6">
                              Quantity
                           </th>
                           <th className="hidden md:table-cell px-2 md:px-6">
                              shipping
                           </th>
                           <th className="px-2 md:px-6">subtotal</th>
                           <th className="px-2 md:px-6">action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="md:px-6 text-[18px] font-caustensemi_bold text-primary flex gap-4 py-10">
                              <div className="rounded-md overflow-hidden">
                                 <img
                                    src={images.CartOne}
                                    alt="product"
                                    className=" w-[105px] h-[120px] object-cover"
                                 />
                              </div>
                              <div className="flex flex-col gap-1 leading-tight">
                                 <p className="text-[18px] font-caustenbold">
                                    Blue Flower Print Crop Top
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Color: Yellow
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Size: M
                                 </p>
                                 <div className="flex gap-4 items-center md:hidden">
                                    <span>$35</span>
                                    <input
                                       type="number"
                                       value="100"
                                       className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                                    />
                                 </div>
                              </div>
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-primary">
                              $29.00
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              <input
                                 type="number"
                                 value="1"
                                 className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                              />
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              FREE
                           </td>
                           <td className="text-center md:text-left md:px-6 text-[18px] font-caustenbold">
                              $29.00
                           </td>
                           <td className="md:px-6">
                              <div className="flex justify-center">
                                 <BsTrash className="text-[18px] font-caustensemi_bold text-blueBar cursor-pointer" />
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td className="md:px-6 text-[18px] font-caustensemi_bold text-primary flex gap-4 py-10">
                              <div className="rounded-md overflow-hidden">
                                 <img
                                    src={images.CartTwo}
                                    alt="product"
                                    className=" w-[105px] h-[120px] object-cover"
                                 />
                              </div>
                              <div className="flex flex-col gap-1 leading-tight">
                                 <p className="text-[18px] font-caustenbold">
                                    Levender Hoodie
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Color: Levender
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Size: XXL
                                 </p>
                                 <div className="flex gap-4 items-center md:hidden">
                                    <span>$119</span>
                                    <input
                                       type="number"
                                       value="1"
                                       className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                                    />
                                 </div>
                              </div>
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-primary">
                              $29.00
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              <input
                                 type="number"
                                 value="100"
                                 className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                              />
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              FREE
                           </td>
                           <td className="text-center md:text-left md:px-6 text-[18px] font-caustenbold">
                              $119.00
                           </td>
                           <td className="md:px-6">
                              <div className="flex justify-center">
                                 <BsTrash className="text-[18px] font-caustensemi_bold text-blueBar cursor-pointer" />
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td className="md:px-6 text-[18px] font-caustensemi_bold text-primary flex gap-4 py-10">
                              <div className="rounded-md overflow-hidden">
                                 <img
                                    src={images.CartThree}
                                    alt="product"
                                    className=" w-[105px] h-[120px] object-cover"
                                 />
                              </div>
                              <div className="flex flex-col gap-1 leading-tight">
                                 <p className="text-[18px] font-caustenbold">
                                    Levender Hoodie
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Color: Black
                                 </p>
                                 <p className="text-sm font-caustenmedium text-secondary">
                                    Size: XXL
                                 </p>
                                 <div className="flex gap-4 items-center md:hidden">
                                    <span>$123</span>
                                    <input
                                       type="number"
                                       value="1"
                                       className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                                    />
                                 </div>
                              </div>
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-primary">
                              $29.00
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              <input
                                 type="number"
                                 value="100"
                                 className="bg-grayBG border-0 w-[80px] rounded-xl px-4 py-1"
                              />
                           </td>
                           <td className="hidden md:table-cell md:px-6 text-[18px] font-caustenbold text-secondary">
                              FREE
                           </td>
                           <td className="text-center md:text-left md:px-6 text-[18px] font-caustenbold">
                              $123.00
                           </td>
                           <td className="md:px-6">
                              <div className="flex justify-center">
                                 <BsTrash className="text-[18px] font-caustensemi_bold text-blueBar cursor-pointer" />
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               {/* cart footer  */}
               <div className="bg-grayBG">
                  <div className="container py-10">
                     <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-full md:w-1/2 xl:w-1/3">
                           <h5 className="text-xl font-caustensemi_bold text-primary">
                              Discount Codes
                           </h5>
                           <p>Enter your coupon code if you have one</p>
                           <div className="flex items-center mt-10">
                              <input
                                 type="text"
                                 className="w-[214px] h-[42px] border border-border border-r-0 rounded-l-xl bg-white"
                              />
                              <button className="w-[180px] h-[42px] bg-blueBar text-white py-2 rounded-r-xl">
                                 Apply Coupon
                              </button>
                           </div>
                           <button className="hidden md:block bg-white border-border text-primary px-8 py-2 rounded-lg mt-5">
                              Continue Shopping
                           </button>
                        </div>
                        <div className="w-full md:w-1/3 xl:w-1/3">
                           <div className="space-y-2 border-0 border-b border-border py-5">
                              <div className="flex justify-between gap-10 items-start text-lg font-caustenmedium text-primary">
                                 <p>Sub Total </p>
                                 <p>$513.00</p>
                              </div>
                              <div className="flex justify-between gap-10 items-start text-lg font-caustenmedium text-primary">
                                 <p>Shipping</p>
                                 <p>$5.00</p>
                              </div>
                              <div className="flex justify-between gap-10 items-start text-lg font-caustenbold text-primary pt-5">
                                 <p>Shipping</p>
                                 <p>$518.00</p>
                              </div>
                           </div>
                           <button className="bg-blueBar px-8 py-2 text-white block mx-auto rounded-md mt-10">
                              Proceed To Checkout
                           </button>
                           <button className="md:hidden bg-white border-border text-primary px-8 py-2 rounded-lg mt-5 block mx-auto">
                              Continue Shopping
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default CartPage;
