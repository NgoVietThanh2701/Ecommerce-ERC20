import React, { useState, useEffect } from 'react'
import CrowdSaleContract from '../../contracts/CrowdSale.contract.ts';
import { FaEthereum } from 'react-icons/fa';
import { RiBtcLine } from "react-icons/ri";
import { RiBnbFill } from "react-icons/ri";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import SwapToken from '../../components/shop/SwapToken';
import HistoryTransaction from '../../components/shop/HistoryTransaction';
import Loading from '../../components/dashboard/Loading';
import Swal from 'sweetalert2';
import SuccessModal from '../../components/shop/SuccessModal.jsx'
import { TbBrandCoinbase } from "react-icons/tb";
import { useOutletContext } from 'react-router-dom';
import ProductContract from '../../contracts/Product.contract.ts';
import Empty from '../../components/Empty.jsx';
import DataTable from '../../components/dashboard/DataGrid.jsx';
import { formatToEth, showShortAddress } from '../../utils/functionUtils.js';
import { getAbiProduct, PRODUCT_ADDRESS } from '../../contracts/config.ts';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { IoCheckmark } from "react-icons/io5";

const BuyToken = () => {

   const { web3Provider, address, transactions } = useOutletContext();

   const [amount, setAmount] = useState(0);
   const [equivalent, setEquivalent] = useState(0);

   const [rate, setRate] = useState(0);
   const [txHash, setTxHash] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);

   const [products, setProducts] = useState([]);

   const getRate = async () => {
      const crowdContract = new CrowdSaleContract();
      const _rate = await crowdContract.getBnbRate();
      setRate(_rate);
   }

   useEffect(() => {
      getRate();
      getProducts();
   }, [address]);

   const handleAmountChange = (e) => {
      const value = e.target.value;
      setAmount(value);
      setEquivalent(value * rate);
   };

   const handleBuyToken = async () => {
      if (!web3Provider) {
         Swal.fire('Opps', 'Vui lòng kết nối với ví', 'error');
         return;
      }
      try {
         setIsLoading(true)
         const crowdContract = new CrowdSaleContract(web3Provider);
         let hash = await crowdContract.buyTokenByBnB(amount);
         setTxHash(hash);
         setIsOpenModal(true);
      } catch (error) {
         Swal.fire('Opps', 'Giao dịch thất bại', 'error');
      } finally {
         setAmount(0)
         setEquivalent(0)
         setIsLoading(false);
      }
   }

   const getProducts = async () => {
      if (address) {
         try {
            const productContract = new ProductContract();
            const productList = await productContract.getProducts();
            const listProducts = [];
            console.log(productList)
            for (let i = 0; i < productList.length; i++) {
               if (productList[i].consumer === address) {
                  listProducts.push(convertObjectProduct(productList[i]));
               }
            }
            setProducts(listProducts.reverse());
         } catch (error) {
            setProducts([]);
         }
      }
   }

   const convertObjectProduct = (data) => {
      return {
         uid: data.uid.toNumber(),
         consumer: data.consumer,
         owner: data.owner,
         productState: data.productState,
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
         shipper: {
            addressShipper: data.shipper.shipperAddress,
            name: data.shipper.name,
            feeShip: formatToEth(data.shipper.feeShip)
         }
      }
   }

   const handleReceiver = async (uid) => {
      if (web3Provider) {
         try {
            setIsLoading(true);
            const productContract = new ProductContract(web3Provider);
            await productContract.receiveProduct(uid);
            listenEvent();
         } catch (error) {
            setIsLoading(false);
         }
      }
   }

   const listenEvent = () => {
      let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
      contract.once("ReceiveByConsumer", (uid) => {
         getProducts();
         setIsLoading(false);
         toast.success("Success", { position: "top-center" });
      })
   }

   const actionConfirm =
   {
      field: 'action',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: (params) => (
         params.row.productState === 3 ?
            <button onClick={() => handleReceiver(params.row.uid)} type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center" >
               Nhận hàng
            </button>
            : <span className='text-green-600 flex items-center gap-2'>Đã nhận hàng <IoCheckmark size={20} /></span>
      )
   }

   const [activeTab, setActiveTab] = useState("buy");
   const data = [
      {
         label: "Mua Token",
         value: "buy",
         desc: <div className='flex mx-40 mt-5'>
            <div className='flex-1 max-w-md mx-auto gap-2'>
               <p className='text-3xl text-gray-700 font-bold mb-5'>Mua tiền mã hóa</p>
               <div className='border border-gray-200 rounded-xl px-5 py-3 '>
                  <p className='text-lg mb-4 block'>Tiền mã hóa phổ biến</p>
                  <ul className='my-3'>
                     <li className='flex items-center justify-between text-sm mt-5'>
                        <span className='flex items-center gap-1'><RiBtcLine className='text-yellow-700' size={23} /> BTC</span>
                        <span>$526.00</span>
                        <span className='text-red-600'>- 2.1%</span>
                     </li>
                     <li className='flex items-center justify-between text-sm mt-5'>
                        <span className='flex items-center gap-1'><RiBnbFill className='text-yellow-500' size={23} /> BNB</span>
                        <span>$526.00</span>
                        <span className='text-red-600'>3%</span>
                     </li>
                     <li className='flex items-center justify-between text-sm mt-5'>
                        <span className='flex items-center gap-1'><FaEthereum className='text-blue-500' size={23} /> ETH</span>
                        <span>$526.00</span>
                        <span className='text-red-600'>- 1.6%</span>
                     </li>
                     <li className='flex items-center justify-between text-sm mt-5'>
                        <span className='flex items-center gap-1'><TbBrandCoinbase className='text-green-500' size={20} /> PEPE</span>
                        <span>$526.00</span>
                        <span className='text-red-600'>- 0.4%</span>
                     </li>
                     <li className='flex items-center justify-between text-sm mt-5'>
                        <span className='flex items-center gap-1'><RiBnbFill className='text-yellow-500' size={23} /> SOL</span>
                        <span>$526.00</span>
                        <span className='text-red-600'>- 2.3%</span>
                     </li>
                  </ul>
               </div>
            </div>
            <div className='flex-1'>
               <SwapToken amount={amount} handleAmountChange={handleAmountChange} rate={rate} equivalent={equivalent} handleBuyToken={handleBuyToken} web3Provider={web3Provider} />
            </div>
         </div>
      },
      {
         label: "Lịch sử giao dịch",
         value: "history",
         desc: <div className='mt-6 mx-24'>
            <HistoryTransaction transactions={transactions.reverse()} />
         </div>
      },
      {
         label: "Đơn hàng",
         value: "ordered",
         desc: products?.length > 0 ?
            <div className='mt-6 mx-24'>
               <DataTable columns={columnOrdered?.concat(actionConfirm)} rows={products} page={5} />
            </div> :
            <Empty />
      },
   ]

   return (
      <div className="flex flex-col min-h-screen">
         {isLoading && <Loading />}
         {isOpenModal && <SuccessModal setIsOpenModal={setIsOpenModal} txHash={txHash} title='Mua token LCK' />}

         <main className="flex-grow p-4 mt-5">
            <Tabs value={activeTab}>
               <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[500px] cursor-pointer"
                  indicatorProps={{ className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none" }}>
                  {data.map(({ label, value }) => (
                     <Tab key={value} value={value} onClick={() => setActiveTab(value)} className={activeTab === value ? "text-gray-900 border-b-2 border-blue-600" : ""} >
                        {label}
                     </Tab>
                  ))}
               </TabsHeader>
               <TabsBody>
                  {data.map(({ value, desc }) => (
                     <TabPanel key={value} value={value}>
                        {desc}
                     </TabPanel>
                  ))}
               </TabsBody>
            </Tabs>
         </main>
         <Toaster />
      </div>
   );
}

export default BuyToken

const columnOrdered = [
   {
      field: 'uid',
      headerName: 'ID',
      width: 70,
      renderCell: (params) => (
         <span>{params.row.uid}</span>
      )
   },
   {
      field: 'ten',
      headerName: 'Sản phẩm',
      width: 250,
      renderCell: (params) => (
         <div className='flex gap-2 items-center'>
            <img src={params.row.productDetails.image} alt="" className='w-20 h-20' />
            <span>{params.row.productDetails.name}</span>
         </div>
      )
   },
   {
      field: 'price',
      headerName: 'Giá (LCK)',
      width: 100,
      renderCell: (params) => (
         <span>{params.row.productDetails.price}</span>
      )
   },
   {
      field: 'feeship',
      headerName: 'Fee Ship (LCK)',
      width: 200,
      renderCell: (params) => (
         <span>${params.row.shipper.feeShip}</span>
      )
   },
   {
      field: 'shipper',
      headerName: 'Người giao hàng',
      width: 200,
      renderCell: (params) => (
         <span>{showShortAddress(params.row.shipper.addressShipper, 5)}</span>
      )
   },
   {
      field: 'seller',
      headerName: 'Người bán',
      width: 200,
      renderCell: (params) => (
         <span>{showShortAddress(params.row.seller.sellerAddress, 5)}</span>
      )
   },
]
