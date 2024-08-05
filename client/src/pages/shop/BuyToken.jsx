import React, { useState, useEffect } from 'react'
import CrowdSaleContract from '../../contracts/CrowdSale.contract.ts';
import LCKContract from '../../contracts/LCK.contract.ts';
import { ethers } from 'ethers';
import { FaWallet, FaEthereum } from 'react-icons/fa';
import { RiBtcLine } from "react-icons/ri";
import { RiBnbFill } from "react-icons/ri";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import SwapToken from '../../components/shop/SwapToken';
import HistoryTransaction from '../../components/shop/HistoryTransaction';
import Loading from '../../components/dashboard/Loading';
import Swal from 'sweetalert2';
import SuccessModal from '../../components/shop/SuccessModal.jsx'
import { TbBrandCoinbase } from "react-icons/tb";

const BuyToken = () => {
   const [amount, setAmount] = useState(0);
   const [equivalent, setEquivalent] = useState(0);

   const [rate, setRate] = useState(0);
   const [web3Provider, setWeb3Provider] = useState();
   const [address, setAddress] = useState('');
   const [balance, setBalance] = useState(0);
   const [txHash, setTxHash] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [transactions, SetTransactions] = useState([]);

   const getRate = async () => {
      const crowdContract = new CrowdSaleContract();
      const _rate = await crowdContract.getBnbRate();
      setRate(_rate);
   }

   const getTransaction = async () => {
      if (web3Provider) {
         const crowdContract = new CrowdSaleContract(web3Provider);
         const histories = await crowdContract.getTransactionsHistory();
         SetTransactions(histories);
      }
   }

   const getBalance = async () => {
      if (web3Provider && address) {
         const lckContract = new LCKContract(web3Provider);
         const balance = await lckContract.balanceOf(address);
         setBalance(balance);
      }
   }
   const connectWallet = async (requestAccess = false) => {
      if (window.ethereum) {
         try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            let accounts;
            if (requestAccess) {
               accounts = await provider.send("eth_requestAccounts", []);
            } else {
               accounts = await provider.send("eth_accounts", []);
            }
            if (accounts.length > 0) {
               const signer = provider.getSigner();
               const address = await signer.getAddress();
               setWeb3Provider(provider);
               setAddress(address);
               localStorage.setItem("isWalletConnected", "true");
               //await getBalance();
            } else {
               Swal.fire('Opps', 'Không tài khoản nào được chọn', 'error');
               localStorage.removeItem("isWalletConnected");
            }
         } catch (error) {
            console.log(error);
            localStorage.removeItem("isWalletConnected");
         }
      }
   };

   useEffect(() => {
      if (localStorage.getItem("isWalletConnected") === "true") {
         connectWallet(false); // Kiểm tra trạng thái kết nối hiện tại mà không yêu cầu quyền truy cập
      }
   }, [])

   useEffect(() => {
      const handleAccountsChanged = async (accounts) => {
         if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setWeb3Provider(provider);
            setAddress(address);
         } else {
            setWeb3Provider(null);
            setAddress("");
            setBalance(0);
            localStorage.removeItem("isWalletConnected");
         }
      };

      const handleDisconnect = () => {
         setWeb3Provider(null);
         setAddress("");
         setBalance(0);
         localStorage.removeItem("isWalletConnected");
      };

      if (window.ethereum) {
         window.ethereum.on("accountsChanged", handleAccountsChanged);
         window.ethereum.on("disconnect", handleDisconnect);
      }

      return () => {
         if (window.ethereum) {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("disconnect", handleDisconnect);
         }
      };
   }, []);

   useEffect(() => {
      const handleBlock = () => {
         getBalance(); // Gọi getBalance để cập nhật số dư khi có block mới
         getTransaction();
      };
      if (web3Provider) {
         const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
         provider.on("block", handleBlock);

         return () => {
            provider.removeListener("block", handleBlock); // Loại bỏ listener khi component bị unmount
         };
      }
   }, [web3Provider]);

   useEffect(() => {
      getRate();
      getTransaction();
      if (address) {
         getBalance(); // Gọi getBalance khi component mount và có địa chỉ ví
      }
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

   const [activeTab, setActiveTab] = useState("buy");
   const data = [
      {
         label: "Mua",
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
               <SwapToken amount={amount} handleAmountChange={handleAmountChange} rate={rate} equivalent={equivalent} handleBuyToken={handleBuyToken} />
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
   ]

   return (
      <div className="flex flex-col min-h-screen">
         {isLoading && <Loading />}
         {isOpenModal && <SuccessModal setIsOpenModal={setIsOpenModal} txHash={txHash} title='Mua token LCK' />}

         <main className="flex-grow p-4 mt-5">
            <Tabs value={activeTab}>
               <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-80 cursor-pointer"
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
      </div>
   );
}

export default BuyToken