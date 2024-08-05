import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/dashboard/Typography/PageTitle'
import Icon from '../../components/dashboard/Icon';
import { NavLink, useOutletContext } from 'react-router-dom';
import { HomeIcon } from '../../assets/dashboard/icons';
import ProductContract from '../../contracts/Product.contract.ts';
import DataTable from '../../components/dashboard/DataGrid.jsx';
import Empty from '../../components/Empty.jsx';

const Order = () => {

   const [products, setProducts] = useState([]);

   const { web3Provider } = useOutletContext();

   const getProducts = async () => {
      const productContract = new ProductContract();
      const productList = await productContract.getProducts();
      const listProducts = [];
      console.log(productList)
      for (let i = 0; i < productList.length - 1; i++) {
         if (productList[i].shipper.shipperAddress !== "0x0000000000000000000000000000000000000000") {
            listProducts.push(convertObjectProduct(productList[i]));
         }
      }
      setProducts(listProducts.reverse());
   }

   useEffect(() => {
      getProducts();
   }, [])

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
            price: data.productDetails.price.toNumber(),
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
            feeShip: data.shipper.feeShip.toNumber()
         }
      }
   }

   const [isLoading, setIsLoading] = useState(false);

   const handleShip = async (uid) => {
      if (web3Provider) {
         try {
            const productContract = new ProductContract(web3Provider);
            await productContract.deliveryProduct(uid);
         } catch (error) {
            console.log(error)
         }
      }
   }

   // const listenEvent = () => {
   //    let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
   //    contract.once("DeliveryToShipper", (uid) => {
   //       setIsLoading(false);
   //       toast.success("Success", { position: "top-center" });
   //       console.log('buy success')
   //       navigate('./')
   //    })
   // }

   const actionSeller =
   {
      field: 'action',
      headerName: 'Thao tác',
      width: 110,
      renderCell: (params) => (
         <button type="button" className="bg-green-500 hover:bg-green-500 mt-4 text-white font-bold py-2 px-4 
         rounded w-full flex items-center justify-center" >
            Xác nhận
         </button>

      )
   }

   return (
      <div>
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
         <span>{params.row.shipper.name} {params.row.shipper.feeShip}</span>
      )
   },
]