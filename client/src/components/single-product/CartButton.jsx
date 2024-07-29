import { IoCartOutline } from "react-icons/io5";

const CartButton = ({ product }) => {
   return (
      <div className="flex gap-5 md:gap-10 items-center">
         <button className="text-lg font-caustensemi_bold flex gap-4 items-center bg-blueBar text-white px-10 py-3 rounded-md">
            <IoCartOutline /> <span>Add to cart</span>
         </button>
         <span className="text-lg font-caustenbold px-10 py-3 rounded-md border border-primary">
            ${product.price}
         </span>
      </div>
   );
};

export default CartButton;
