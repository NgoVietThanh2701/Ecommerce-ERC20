import React, { useContext, Suspense, useEffect, useState, lazy } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header'
import Main from './Main';
import { ethers } from 'ethers';
import ThemedSuspense from '../../components/dashboard/ThemedSuspense'
import { SidebarContext } from '../../context/dashboard/SideBarContext';
import LCKContract from '../../contracts/LCKContract.ts'

const Layout = () => {
   const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
   const [web3Provider, setWeb3Provider] = useState();
   const [address, setAddress] = useState('');
   const [balance, setBalance] = useState(0);

   let location = useLocation();

   useEffect(() => {
      closeSidebar()
   }, [location]);

   useEffect(() => {
      if (location.pathname.startsWith('/dashboard')) {
         import("../../assets/dashboard/css/tailwind.output.css")
      }
   }, [location]);

   const getBalance = async () => {
      if (web3Provider && address) {
         const lckContract = new LCKContract(web3Provider);
         const balanceOfAccount = await lckContract.balanceOf(address);
         setBalance(balanceOfAccount);
      }
   }

   useEffect(() => {
      if (address) {
         getBalance(); // Gọi getBalance khi component mount và có địa chỉ ví
      }
   }, [address]);

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
               localStorage.setItem("isMetamaskConnected", "true");
            } else {
               localStorage.removeItem("isMetamaskConnected");
            }
         } catch (error) {
            console.log(error);
            localStorage.removeItem("isMetamaskConnected");
         }
      }
   };

   /* Check connect Wallet. If connected -> getAccount. Else -> request connect*/
   useEffect(() => {
      if (localStorage.getItem("isMetamaskConnected") === "true") {
         connectWallet(false);
      }
   }, []);

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
            localStorage.removeItem("isMetamaskConnected");
         }
      };

      const handleDisconnect = () => {
         setWeb3Provider(null);
         setAddress("");
         setBalance(0);
         localStorage.removeItem("isMetamaskConnected");
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
      };
      if (web3Provider) {
         const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
         provider.on("block", handleBlock);

         return () => {
            provider.removeListener("block", handleBlock); // Loại bỏ listener khi component bị unmount
         };
      }
   }, [web3Provider]);

   return (
      <div className={` flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
         <Suspense fallback={<ThemedSuspense />}>
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
               <Header connectWallet={connectWallet} address={address} balance={balance} />
               <Main>
                  <Outlet />
               </Main>
            </div>
         </Suspense>
      </div >
   )
}

export default Layout
