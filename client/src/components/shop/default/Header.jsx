import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsGridFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import images from "../../../assets/shop/img";
import MobileMenu from "../MobileMenu";
import { Link } from "react-router-dom";
import { showShortAddress } from '../../../utils/functionUtils.js';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Menu from "../../../routes/narbar";
import ModalViewProduct from "../ModalRegister.jsx";
import ProductContract from "../../../contracts/Product.contract.ts";

const Header = ({ connectWallet, address, balance, web3Provider }) => {

   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);

   const [isSeller, setIsSeller] = useState(false);
   const [isShipper, setIsShipper] = useState(false);

   const checkSeller = async () => {
      let result = false;
      const productContract = new ProductContract(web3Provider);
      result = await productContract.isSeller(address);
      setIsSeller(result)
   }

   const checkShipper = async () => {
      let result = false;
      const productContract = new ProductContract(web3Provider);
      result = await productContract.isShipper(address);
      setIsShipper(result)
   }

   useEffect(() => {
      if (web3Provider && address) {
         checkSeller();
         checkShipper();
      }
   }, [address]);

   const toggleMobileMenu = () => {
      setShowMobileMenu(!showMobileMenu);
   };

   return (
      <header>
         <div className="container">
            {isOpenModal && <ModalViewProduct setIsOpenModal={setIsOpenModal} address={address} isSeller={isSeller} isShipper={isShipper} />}
            <div className="flex justify-between gap-12 items-center h-[108px]">
               <div className="logo">
                  <Link to="/">
                     <img src={images.logo} alt="Eupheria" />
                  </Link>
               </div>
               <nav className="hidden md:flex">
                  <ul className="nav-menu flex gap-8 font-caustenmedium text-lg text-secondary">
                     {Menu.map((item) => (
                        <li key={item.id}>
                           <Link to={item.link}>{item.title}</Link>
                        </li>
                     ))}
                  </ul>
               </nav>
               <div className="relative hidden md:flex">
                  <input
                     type="text"
                     placeholder="Search"
                     className="h-[44px] w-[265px] bg-grayBG py-4 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 delay-75"
                  />
                  <CiSearch className="absolute top-3 text-lg text-secondary left-3" />
               </div>
               <button onClick={toggleMobileMenu}>
                  <BsGridFill className="flex text-secondary text-lg md:hidden hover:text-primary transition-colors duration-200" />
               </button>
               <div className="hidden md:flex gap-2 text-secondary ">
                  {(address) ?
                     <div className="group relative flex items-center gap-2">
                        <span className="font-medium">{showShortAddress(address, 5)} ({balance} LCK)</span>
                        <Jazzicon diameter={33} seed={jsNumberForAddress(address)} />
                        <ul className='w-44 bg-white hidden group-hover:block absolute top-12 left-16 rounded-t-md  rounded-b-md z-20 shadow-md py-3 transform transition duration-300'>
                           {(isSeller || isShipper || address === process.env.REACT_APP_ADMIN) &&
                              <Link to='./dashboard' className="block py-2 px-3 hover:bg-slate-100">Trang quản trị</Link>}
                           <button onClick={() => setIsOpenModal(true)} className='w-full text-left py-2 px-3 hover:bg-slate-100'>Đăng ký</button>
                        </ul>
                        <div className="z-10 h-7 w-32 absolute top-full right-0"></div>
                     </div> :
                     <button onClick={connectWallet} className="bg-grayBG p-3 rounded-md hover:bg-blueBar hover:text-white transition-all duration-200 delay-75">
                        Connect Metamask
                     </button>}
               </div>
               {/* Mobile Menu  */}
               <MobileMenu
                  Menu={Menu}
                  toggleMobileMenu={toggleMobileMenu}
                  showMobileMenu={showMobileMenu}
               />
            </div>
         </div>
      </header>
   );
};

export default Header;
