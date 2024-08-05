import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

function Sidebar({ address, web3Provider }) {
   return (
      <>
         <DesktopSidebar address={address} web3Provider={web3Provider} />
         <MobileSidebar />
      </>
   )
}

export default Sidebar
