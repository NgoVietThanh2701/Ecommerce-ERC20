import images from "../../assets/img/index.js";
import {
   FaFacebookF,
   FaTwitter,
   FaInstagram,
   FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
   return (
      <section className="footer bg-[#2A2F2F] py-10">
         <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-14">
               <div>
                  <h4 className="text-2xl font-caustenbold text-white">Need Help</h4>
                  <ul className="mt-5">
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Contact Us
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Track Order
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Returns & Refunds
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           FAQ's
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Career
                        </a>
                     </li>
                  </ul>
                  <div className="flex flex-wrap gap-3 mt-20">
                     <a href="/" className="bg-white p-1 rounded-md">
                        <FaFacebookF />
                     </a>
                     <a href="/" className="bg-white p-1 rounded-md">
                        <FaTwitter />
                     </a>
                     <a href="/" className="bg-white p-1 rounded-md">
                        <FaInstagram />
                     </a>
                     <a href="/" className="bg-white p-1 rounded-md">
                        <FaLinkedinIn />
                     </a>
                  </div>
               </div>
               <div>
                  <h4 className="text-2xl font-caustenbold text-white">Company</h4>
                  <ul className="mt-5">
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           About Us
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           euphoria Blog
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           euphoriastan
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Collaboration
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Media
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-2xl font-caustenbold text-white">More Info</h4>
                  <ul className="mt-5">
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Term and Conditions
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Privacy Policy
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Shipping Policy
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           FAQ's
                        </a>
                     </li>
                     <li className="text-white text-sm font-caustenmedium mb-3">
                        <a href="/" className="text-[18px] font-caustenmedium">
                           Sitemap
                        </a>
                     </li>
                  </ul>
               </div>
               <div className="col-span-2">
                  <h4 className="text-2xl font-caustenbold text-white">Location</h4>
                  <ul className="mt-5">
                     <li className="text-white text-[18px] font-caustenmedium mb-3">
                        support@euphoria.in
                     </li>
                     <li className="text-white text-[18px] font-caustenmedium mb-3">
                        Eklingpura Chouraha, Ahmedabad Main Road
                     </li>
                     <li className="text-white mb-3 text-[18px] font-caustenmedium">
                        (NH 8- Near Mahadev Hotel) Udaipur, India- 313002
                     </li>
                  </ul>
                  <h4 className="text-2xl font-caustenbold text-white mt-20">
                     Download The App
                  </h4>
                  <div className="flex gap-6 overflow-hidden mt-8">
                     <img src={images.Gooleplay} alt="google play" className="w-1/2" />
                     <img src={images.Applestore} alt="app store" className="w-1/2" />
                  </div>
               </div>
            </div>
            <hr className="border-[#807D7E] my-10" />
            <p className="text-center text-white">Copyright © 2023 Browter.com</p>
         </div>
      </section>
   );
};

export default Footer;
