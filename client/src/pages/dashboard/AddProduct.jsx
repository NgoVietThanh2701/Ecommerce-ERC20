import React, { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import Icon from "../../components/dashboard/Icon";
import PageTitle from "../../components/dashboard/Typography/PageTitle";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../../assets/dashboard/icons";
import { Card, CardBody, Label, Input, Textarea, Button, Select } from "@windmill/react-ui";
import ProductContract from "../../contracts/Product.contract.ts";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loading from "../../components/dashboard/Loading.jsx";
import { getAbiProduct, PRODUCT_ADDRESS } from "../../contracts/config.ts";
import { ethers } from "ethers";

const FormTitle = ({ children }) => {
   return (
      <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
         {children}
      </h2>
   );
};

const { v4: uuidv4 } = require('uuid');
const pinataConfig = {
   root: 'https://api.pinata.cloud',
   headers: {
      'pinata_api_key': process.env.REACT_APP_PINATA_APIKEY,
      'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRETKEY
   }
};

const sizes = ["M", "N", "L", "K"];

const AddProduct = () => {

   const { web3Provider } = useOutletContext();

   const [isLoading, setIsLoading] = useState(false);

   const [payload, setPayload] = useState({
      name: '',
      price: '',
      image: null,
      description: '',
      size: ''
   });

   async function handlAddProduct() {
      if (payload.image && web3Provider) {
         try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', payload.image);
            formData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));
            formData.append('pinataMetadata', JSON.stringify({ name: payload.image['name'] }));
            const url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
            const response = await axios({
               method: 'post',
               url: url,
               data: formData,
               headers: pinataConfig.headers
            });
            const urlImage = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            const productContract = new ProductContract(web3Provider);
            listenEvent();
            await productContract.soldProduct(payload.name, uuidv4(), Number.parseFloat(payload.price), urlImage, payload.description, payload.size);
            setPayload({ name: '', price: '', image: null, description: '', size: '' });
         } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra", { position: "top-center" });
            setIsLoading(false);
         }
      } else {
         console.log('ereror')
      }
   }

   const listenEvent = () => {
      let contract = new ethers.Contract(PRODUCT_ADDRESS, getAbiProduct(), web3Provider);
      contract.once("SoldBySeller", (uid) => {
         setIsLoading(false);
         toast.success("Success", { position: "top-center" });
      })
   }

   return (
      <div>
         {isLoading && <Loading />}
         <PageTitle>Add New Product</PageTitle>
         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/app/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">Add new Product</p>
         </div>

         <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
            <Card className="row-span-2 md:col-span-2">
               <CardBody>
                  <FormTitle>Hình ảnh</FormTitle>
                  <input
                     type="file"
                     className="mb-4 text-gray-800 dark:text-gray-300"
                     onChange={(e) => setPayload((prev) => ({ ...prev, image: e.target.files[0] }))}
                  />

                  <FormTitle>Tên sản phẩm</FormTitle>
                  <Label>
                     <Input className="mb-4" placeholder="Type product name here" value={payload.name}
                        onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))} />
                  </Label>

                  <FormTitle>Giá (LCK)</FormTitle>
                  <Label>
                     <Input type="number" className="mb-4" placeholder="Enter product price here" value={payload.price}
                        onChange={(e) => setPayload((prev) => ({ ...prev, price: e.target.value }))} />
                  </Label>

                  <FormTitle>Mô tả</FormTitle>
                  <Label>
                     <Textarea
                        className="mb-4"
                        rows="2"
                        placeholder="Enter product short description here"
                        value={payload.description}
                        onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
                     />
                  </Label>

                  <Label className="mt-4 mb-4">
                     <FormTitle>Chọn size</FormTitle>
                     <Select className="mt-1" onChange={(e) => setPayload((prev) => ({ ...prev, size: e.target.value }))}>
                        <option value=''>Chọn size</option>
                        {sizes && sizes.map((size, index) => (
                           <option key={index} value={size}>{size}</option>
                        ))}
                     </Select>
                  </Label>

                  {isLoading ? 'Loadding...' : <div className="w-full" onClick={handlAddProduct}>
                     <Button size="large" iconLeft={AddIcon} >
                        Add Product
                     </Button>
                  </div>}
               </CardBody>
            </Card>

            <Card className="h-48">
               <CardBody>
                  <div className="flex mb-8">
                     <Button layout="primary" className="mr-3" iconLeft={PublishIcon}>
                        Publish
                     </Button>
                     <Button layout="link" iconLeft={StoreIcon}>
                        Save as Draft
                     </Button>
                  </div>
                  <Label className="mt-4">
                     <FormTitle>Select Product Category</FormTitle>
                     <Select className="mt-1">
                        <option>Electronic</option>
                        <option>Fashion</option>
                        <option>Cosmatics</option>
                        <option>Food and Meal</option>
                     </Select>
                  </Label>
               </CardBody>
            </Card>
         </div>
         <Toaster />
      </div>
   );
};

export default AddProduct;
