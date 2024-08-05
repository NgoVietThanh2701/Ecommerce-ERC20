import React from 'react';
import images from '../assets/shop/img';

const Empty = ({ width = "220px" }) => {
   return (
      <div className={`w-full mx-auto`}>
         <img src={images.noData} alt="" className={`mx-auto w-[${width}]`} />
      </div>
   )
}

export default Empty