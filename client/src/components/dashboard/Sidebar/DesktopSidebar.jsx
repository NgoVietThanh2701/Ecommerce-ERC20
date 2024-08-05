import React from 'react'

import SidebarContent from './SidebarContent'

function DesktopSidebar({ address, web3Provider }) {
   return (
      <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
         <SidebarContent address={address} web3Provider={web3Provider} />
      </aside>
   )
}

export default DesktopSidebar
