import React, { useContext, useEffect, useState } from 'react';
import Icon from '../../components/dashboard/Icon';
import { HomeIcon } from '../../assets/dashboard/icons';
import { NavLink, useOutletContext } from 'react-router-dom';
import PageTitle from '../../components/dashboard/Typography/PageTitle'
import DataTable from '../../components/dashboard/DataGrid';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { formatTime } from '../../utils/functionUtils';
import ProductContract from '../../contracts/Product.contract.ts';
import toast, { Toaster } from 'react-hot-toast';
import Empty from '../../components/Empty.jsx';
import { getAbiProduct, PRODUCT_ADDRESS } from '../../contracts/config.ts';
import { ethers } from 'ethers';
import Loading from '../../components/dashboard/Loading.jsx';

const Request = () => {

   const { web3Provider } = useOutletContext();

   const [sellers, setSellers] = useState([]);
   const [shippers, setShippers] = useState([]);
   const [isloading, setIsLoading] = useState(false);

   const getSellers = () => {
      const sellers = localStorage.getItem("registrySeller");
      sellers ? setSellers(JSON.parse(sellers)) : setSellers([]);
   }

   const getShippres = () => {
      const shippers = localStorage.getItem("registryShipper");
      shippers ? setShippers(JSON.parse(shippers)) : setShippers([]);
   }

   useEffect(() => {
      getSellers();
      getShippres();
   }, []);

   const [activeTab, setActiveTab] = useState("sell");

   const handleRequestSeller = async (address, name, addressShop) => {
      if (web3Provider) {
         try {
            setIsLoading(true);
            const productContract = new ProductContract(web3Provider);
            await productContract.addSeller(address, name, addressShop);
            listenEvent("AddSeller");
         } catch (error) {
            toast.error("Thêm thất bại", { position: "top-center" });
         }
      }
   }

   const handleRequestShipper = async (address, name, feeShip) => {
      if (web3Provider) {
         try {
            setIsLoading(true);
            const productContract = new ProductContract(web3Provider);
            await productContract.addShipper(address, name, feeShip);
            listenEvent("AddShipper");
         } catch (error) {
            toast.error("Thêm thất bại", { position: "top-center" });
            setIsLoading(false);
         }
      }
   }

   const listenEvent = (event) => {
      let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
      contract.once(event, (uid) => {
         toast.success("Success", { position: "top-center" });
         if (event === "AddSeller") {
            localStorage.removeItem("registrySeller");;
            getSellers();
         } else if (event === "AddShipper") {
            localStorage.removeItem("registryShipper");
            getShippres();
         }
         setIsLoading(false);
      })
   }

   const actionSeller =
   {
      field: 'action',
      headerName: 'Thao tác',
      width: 110,
      renderCell: (params) => (
         <button onClick={() => handleRequestSeller(params.row.address, params.row.nameShop, params.row.addressShop)} type="button" className="bg-green-500 hover:bg-green-500 mt-4 text-white font-bold py-2 px-4 
         rounded w-full flex items-center justify-center" >
            Xác nhận
         </button>

      )
   }

   const actionShipper =
   {
      field: 'action',
      headerName: 'Thao tác',
      width: 110,
      renderCell: (params) => (
         <button type="button" onClick={() => handleRequestShipper(params.row.address, params.row.nameShipper, params.row.feeShip)} className="bg-green-500 hover:bg-green-500 mt-4 text-white font-bold py-2 px-4 
         rounded w-full flex items-center justify-center" >
            Xác nhận
         </button>

      )
   }


   const data = [
      {
         label: `Bán hàng ${sellers?.length}`,
         value: "sell",
         desc: sellers?.length > 0 ? <DataTable columns={columnSeller.concat(actionSeller)} rows={sellers} page={3} /> :
            <Empty />
      },
      {
         label: `Giao hàng ${shippers.length}`,
         value: "delivery",
         desc: shippers?.length > 0 ? <DataTable columns={columnShipper?.concat(actionShipper)} rows={shippers} page={3} /> :
            <Empty />
      },
   ]

   return (
      <div>
         {isloading && <Loading />}
         <PageTitle>Đăng ký</PageTitle>
         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">Request</p>
         </div>
         <div className='mt-10'>
            <Tabs value={activeTab}>
               <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-80 cursor-pointer"
                  indicatorProps={{ className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none" }}>
                  {data.map(({ label, value }) => (
                     <Tab key={value} value={value} onClick={() => setActiveTab(value)} className={activeTab === value ? "text-gray-900" : ""} >
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
         </div>
         <Toaster />
      </div>
   )
}

export default Request

const columnSeller = [
   {
      field: 'id',
      headerName: 'STT',
   },
   {
      field: 'address',
      headerName: 'Address',
      width: 400,
   },
   {
      field: 'nameShop',
      headerName: 'Tên',
      width: 100,
   },
   {
      field: 'addressShop',
      headerName: 'Phí ship',
      width: 150,
      renderCell: (params) => (
         <span>{params.row.addressShop}</span>
      )
   },
   {
      field: 'date',
      headerName: 'Thời gian',
      width: 200,
      renderCell: (params) => (
         <span>{formatTime(params.row.date)}</span>
      )
   },
]

const columnShipper = [
   {
      field: 'id',
      headerName: 'STT',
   },
   {
      field: 'address',
      headerName: 'Address',
      width: 400,
   },
   {
      field: 'nameShipper',
      headerName: 'Tên',
      width: 150,
   },
   {
      field: 'feeShip',
      headerName: 'Phí ship(Km/h)',
      width: 170
   },
   {
      field: 'date',
      headerName: 'Thời gian',
      width: 200,
      renderCell: (params) => (
         <span>{formatTime(params.row.date)}</span>
      )
   },
]