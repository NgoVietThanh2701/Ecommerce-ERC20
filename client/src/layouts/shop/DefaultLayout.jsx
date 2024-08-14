import React, { Suspense, useState, useEffect } from 'react'
import Footer from "../../components/shop/default/Footer.jsx";
import Header from "../../components/shop/default/Header.jsx";
import { Outlet } from 'react-router-dom';
import ThemedSuspense from '../../components/dashboard/ThemedSuspense'
import { ethers } from 'ethers';
import LCKContract from '../../contracts/LCK.contract.ts'
import CrowdSaleContract from '../../contracts/CrowdSale.contract.ts';

const DefaultLayout = () => {

   const [web3Provider, setWeb3Provider] = useState();
   const [address, setAddress] = useState('');
   const [balance, setBalance] = useState(0);
   const [transactions, SetTransactions] = useState([]);

   const getBalance = async () => {
      if (web3Provider && address) {
         const lckContract = new LCKContract(web3Provider);
         const balanceOfAccount = await lckContract.balanceOf(address);
         setBalance(balanceOfAccount);
      }
   }

   const getTransaction = async () => {
      if (web3Provider) {
         const crowdContract = new CrowdSaleContract(web3Provider);
         const histories = await crowdContract.getTransactionsHistory();
         SetTransactions(histories);
      }
   }

   useEffect(() => {
      if (address) {
         getBalance(); // Gọi getBalance khi component mount và có địa chỉ ví
         getTransaction();
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
            SetTransactions([])
            localStorage.removeItem("isMetamaskConnected");
         }
      };

      const handleDisconnect = () => {
         setWeb3Provider(null);
         setAddress("");
         setBalance(0);
         SetTransactions([])
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

   return (
      <>
         <Suspense fallback={<ThemedSuspense />}>
            <Header connectWallet={connectWallet} address={address} balance={balance} web3Provider={web3Provider} />
            <Outlet context={{ web3Provider, address, transactions }} />
            <Footer />
         </Suspense>
      </>
   )
}

export default DefaultLayout