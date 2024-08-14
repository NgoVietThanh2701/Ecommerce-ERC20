import React, { useEffect, useState } from 'react'
import { formatTime, formatToEth } from '../../utils/functionUtils'
import ProductContract from '../../contracts/Product.contract.ts';
import { NavLink, useOutletContext } from 'react-router-dom';
import PageTitle from '../../components/dashboard/Typography/PageTitle';
import Icon from '../../components/dashboard/Icon';
import { HomeIcon } from '../../assets/dashboard/icons';
import DataTable from '../../components/dashboard/DataGrid';
import Empty from '../../components/Empty';

const TransactionHistory = () => {

   const { web3Provider, address } = useOutletContext();
   const [transactions, setTransactions] = useState([]);

   const getTransactions = async () => {
      if (address, web3Provider) {
         try {
            const productContract = new ProductContract(web3Provider);
            const transactionsList = await productContract.getTransactionsHistory();
            const listTransactions = [];
            for (let i = 0; i < transactionsList.length; i++) {
               listTransactions.push(convertObjectTransaction(transactionsList[i]));
            }
            setTransactions(listTransactions.reverse());
         } catch (error) {
            setTransactions([]);
         }
      }
   }

   useEffect(() => {
      getTransactions();
   }, [address])

   const convertObjectTransaction = (data) => {
      return {
         uid: data.productID.toNumber(),
         title: data.title,
         date: formatTime(data.date * 1000),
         price: formatToEth(data.tokenAmount)
      }
   }

   return (
      <div>
         <PageTitle>Lịch sử giao dịch</PageTitle>
         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">Lịch sử giao dịch</p>
         </div>
         <div className='mt-10'>
            {transactions.length > 0 ?
               <DataTable columns={column} rows={transactions} page={5} /> :
               <Empty />}
         </div>
      </div>
   )
}

export default TransactionHistory

const column = [
   {
      field: 'date',
      headerName: 'Thời gian',
      width: 180,
      renderCell: (params) => (
         <span>{params.row.date}</span>
      )
   },
   {
      field: 'uid',
      headerName: 'ID Sản phẩm',
      width: 150,
      renderCell: (params) => (
         <span>{params.row.uid}</span>
      )
   },
   {
      field: 'price',
      headerName: 'Số token',
      width: 270,
      renderCell: (params) => (
         <span className='text-red-500'>+${params.row.price} LCK</span>
      )
   },
   {
      field: 'title',
      headerName: 'Nội dung',
      width: 250,
      renderCell: (params) => (
         <span>{params.row.title}</span>
      )
   },
]