import React, { useEffect, useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import PageTitle from '../../components/dashboard/Typography/PageTitle';
import ProductContract from '../../contracts/Product.contract.ts';
import { formatTime, formatToEth } from '../../utils/functionUtils';
import DataTable from '../../components/dashboard/DataGrid';
import { HomeIcon } from '../../assets/dashboard/icons';
import Icon from '../../components/dashboard/Icon';
import Empty from '../../components/Empty.jsx';

const User = () => {

   const { address } = useOutletContext();

   const [sellers, setSellers] = useState([]);
   const [shippers, setShippers] = useState([]);

   const getSellers = async () => {
      if (address === process.env.REACT_APP_ADMIN) {
         try {
            const productContract = new ProductContract();
            const sellers = await productContract.getSellers();
            setSellers(sellers);
         } catch (error) {
            console.log('error at Users.jsx')
         }
      } else {
         setSellers([]);
      }

   }

   const getShippers = async () => {
      if (address === process.env.REACT_APP_ADMIN) {
         try {
            const productContract = new ProductContract();
            const shippers = await productContract.getShippers();
            setShippers(shippers);
         } catch (error) {
            console.log('error at Users.jsx')
         }
      } else {
         setShippers([]);
      }
   }

   useEffect(() => {
      getSellers();
      getShippers();
   }, [address])

   return (
      <div>
         <PageTitle>Người dùng</PageTitle>
         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">Người dùng</p>
         </div>
         <div className='mt-10'>
            {sellers.length > 0 || shippers.length > 0 ?
               <DataTable columns={columnSeller} rows={[...sellers, ...shippers]} page={4} /> :
               <Empty />}
         </div>
      </div>
   )
}

export default User;

const columnSeller = [
   {
      field: 'id',
      headerName: 'STT',
      width: 100
   },
   {
      field: 'sellerAddress',
      headerName: 'Address',
      width: 400,
      renderCell: (params) => (
         <span>{params.row.sellerAddress ?? params.row.shipperAddress}</span>
      )
   },
   {
      field: 'name',
      headerName: 'Tên',
      width: 350,
   },
   {
      field: 'addressShop',
      headerName: 'Địa chỉ/Fee Ship',
      width: 250,
      renderCell: (params) => (
         <span>{params.row.addressShop ?? `${formatToEth(params.row.feeShip)} Lck/KM`}</span>
      )
   },
]