import React from 'react';
import { MdSwapVert } from "react-icons/md";
const SwapToken = ({ amount, handleAmountChange, handleBuyToken, equivalent, rate }) => {
   return (
      <form className="max-w-md mx-auto">
         <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Enter Amount:</label>
            <input
               id="amount"
               type="number"
               value={amount}
               onChange={handleAmountChange}
               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>
         <MdSwapVert className='mx-auto text-gray-700' size={22} />
         <div className="mb-4">
            <label htmlFor="equivalent" className="block text-gray-700 text-sm font-bold mb-2">Equivalent (at rate {rate}):</label>
            <input
               id="equivalent"
               type="number"
               value={equivalent}
               readOnly
               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>
         <button
            type="button" onClick={handleBuyToken}
            className="bg-blue-600 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
         >
            Swap
         </button>
      </form>
   )
};

export default SwapToken;
