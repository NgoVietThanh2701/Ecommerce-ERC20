import React, { useEffect, useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import DataTable from '../dashboard/DataTable';
import InputForm from './widgets/InputForm';
import { useOutletContext } from 'react-router-dom';

const ModalViewProduct = ({ setIsOpenModal, address }) => {

   const [activeTab, setActiveTab] = useState("registry-seller");
   const [nameShop, SetNameShop] = useState("");
   const [addressShop, SetAddressShop] = useState("");
   const [nameShipper, SetNameShipper] = useState("");
   const [feeShip, SetFeeShip] = useState('');

   const [isRegisteredSeller, SetIsRegisteredSeller] = useState(false);
   const [isRegisteredShipper, SetIsRegisteredShipper] = useState(false);

   const handleRegistrySeller = () => {
      const newSeller = { address, nameShop, addressShop };
      const existSeller = JSON.parse(localStorage.getItem('registrySeller')) || [];
      existSeller.push(newSeller);
      localStorage.setItem("registrySeller", JSON.stringify(existSeller));
      SetNameShop("");
      SetAddressShop("");
      SetIsRegisteredSeller(true);
   }

   const handleRegistryShipper = () => {
      const newShipper = { address, nameShipper, feeShip };
      const existShipper = JSON.parse(localStorage.getItem('registryShipper')) || [];
      existShipper.push(newShipper);
      localStorage.setItem("registryShipper", JSON.stringify(existShipper));
      SetNameShipper("");
      SetFeeShip("");
      SetIsRegisteredShipper(true);
   }

   useEffect(() => {
      const existSeller = JSON.parse(localStorage.getItem('registrySeller')) || [];
      existSeller.some(seller => seller.address === address) && SetIsRegisteredSeller(true);
      const existShipper = JSON.parse(localStorage.getItem('registryShipper')) || [];
      existShipper.some(shipper => shipper.address === address) && SetIsRegisteredShipper(true);
   }, [address])


   const data = [
      {
         label: `Đăng ký bán hàng`,
         value: "registry-seller",
         desc:
            <div className='flex flex-col gap-3 items-center justify-center mt-3'>
               {isRegisteredSeller ?
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-3">
                     <p className="text-lg font-semibold">Xác nhận đăng ký</p>
                     <p>Hệ thống đã xác nhận bạn đăng ký làm người bán hàng thành công! Vui lòng đợi trong thời gian đươc duyệt.</p>
                  </div> :
                  <><InputForm type="text" id="inputForNameSeller" name="Tên cửa hàng" value={nameShop} setValue={SetNameShop} />
                     <InputForm type="text" id="inputForAddressSeller" name="Địa chỉ" value={addressShop} setValue={SetAddressShop} />
                     <button onClick={handleRegistrySeller} type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng ký</button>
                  </>
               }

            </div>
      },
      {
         label: `Đăng ký giao hàng`,
         value: "registry-shipper",
         desc:
            <div className='flex flex-col gap-3 items-center justify-center mt-3'>
               {isRegisteredShipper ?
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-3">
                     <p className="text-lg font-semibold">Xác nhận đăng ký</p>
                     <p>Hệ thống đã xác nhận bạn đăng ký làm người vận chuyển thành công! Vui lòng đợi trong thời gian đươc duyệt.</p>
                  </div> :
                  <>
                     <InputForm type="text" id="inputForNameShipper" name="Tên đơn vị vận chuyển" value={nameShipper} setValue={SetNameShipper} />
                     <InputForm type="number" id="inputForFeeShip" name="Chi phí vận chuyển(Km)" value={feeShip} setValue={SetFeeShip} />
                     <button onClick={handleRegistryShipper} type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng ký</button>
                  </>}

            </div>
      }
   ]

   return (
      <div className='z-50 bg-half-transparent nav-item w-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
         <div className='bg-white w-[470px] relative rounded-md pt-5 pb-2 px-6 flex flex-col gap-2.5 mb-16'>
            <button className='absolute top-2 right-2 text-444' onClick={() => setIsOpenModal(false)}>
               <IoCloseCircleOutline size={24} />
            </button>
            <h3 className='text-333 font-medium text-xl'>Thông tin đăng ký</h3>
            <Tabs value={activeTab}>
               <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
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
         </div>
      </div>
   )
}

export default ModalViewProduct