import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/dashboard/Typography/PageTitle'
import Icon from '../../components/dashboard/Icon';
import { NavLink, useOutletContext } from 'react-router-dom';
import { HomeIcon } from '../../assets/dashboard/icons';
import ProductContract from '../../contracts/Product.contract.ts';
import DataTable from '../../components/dashboard/DataGrid.jsx';
import Empty from '../../components/Empty.jsx';
import { formatToEth, showShortAddress } from '../../utils/functionUtils.js';
import { getAbiProduct, PRODUCT_ADDRESS } from '../../contracts/config.ts';
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import Loading from '../../components/dashboard/Loading.jsx';

const Order = () => {

   const [products, setProducts] = useState([]);

   const { web3Provider, address } = useOutletContext();

   const getProducts = async () => {
      if (address) {
         try {
            const productContract = new ProductContract();
            const productList = await productContract.getProductsFromOwner(address);
            const listProducts = [];
            for (let i = 0; i < productList.length; i++) {
               if (productList[i].productState === 1) {
                  listProducts.push(convertObjectProduct(productList[i]));
               }
            }
            setProducts(listProducts.reverse());
         } catch (error) {
            setProducts([]);
         }
      }
   }

   useEffect(() => {
      getProducts();
   }, [address])

   const convertObjectProduct = (data) => {
      return {
         uid: data.uid.toNumber(),
         consumer: data.consumer,
         owner: data.owner,
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

   const [isLoading, setIsLoading] = useState(false);

   const handleDelivery = async (uid) => {
      if (web3Provider) {
         try {
            setIsLoading(true);
            const productContract = new ProductContract(web3Provider);
            await productContract.deliveryProduct(uid);
            listenEvent();
         } catch (error) {
            console.log(error);
            setIsLoading(false);
         }
      }
   }

   const listenEvent = () => {
      let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
      contract.once("DeliveryToShipper", (uid) => {
         getProducts();
         setIsLoading(false);
         toast.success("Success", { position: "top-center" });
      })
   }

   const actionSeller =
   {
      field: 'action',
      headerName: 'Thao tác',
      width: 110,
      renderCell: (params) => (
         <button onClick={() => handleDelivery(params.row.uid)} type="button" className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 
         rounded w-full flex items-center justify-center" >
            Xác nhận
         </button>
      )
   }

   return (
      <div>
         {isLoading && <Loading />}
         <PageTitle>Đơn đặt hàng</PageTitle>
         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">Đơn hàng</p>
         </div>
         <div className='mt-10'>
            {products.length > 0 ?
               <DataTable columns={column.concat(actionSeller)} rows={products} page={3} /> :
               <Empty />}
         </div>
         <Toaster />
      </div>
   )
}

export default Order;

const column = [
   {
      field: 'uid',
      headerName: 'STT',
      width: 300,
      renderCell: (params) => (
         <span>{params.row.productDetails.code}</span>
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
      field: 'tenz',
      headerName: 'Gia',
      width: 100,
      renderCell: (params) => (
         <span>{params.row.productDetails.price}</span>
      )
   },
   {
      field: 'PhiShip',
      headerName: 'Địa chỉ/Fee Ship',
      width: 200,
      renderCell: (params) => (
         <span>{params.row.shipper.name} ${params.row.shipper.feeShip}LCK</span>
      )
   },
   {
      field: 'ship',
      headerName: 'Người giao hàng',
      width: 200,
      renderCell: (params) => (
         <span>{showShortAddress(params.row.shipper.addressShipper, 5)}</span>
      )
   },

]