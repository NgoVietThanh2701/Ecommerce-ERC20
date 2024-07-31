import React from 'react'

const CategoryLayout = () => {

   const { category } = useParams();
   const [sidebar, setSidebar] = useState(false);
   const toogleSidebar = () => {
      setSidebar(!sidebar);
   };

   return (
      <section className="product-page broder-0 border-t border-border">
         <div className="container">
            <div className="flex justify-between gap-14">
               {/* Sidebar  */}
               <Sidebar sidebarAction={toogleSidebar} sidebar={sidebar} />
               {/* End Sidebar  */}

               {/* Products  */}
               <div className=" py-14 w-full">
                  {/* Heading  */}
                  <div className="flex flex-col justify-between items-center w-full mb-10 md:flex-row">
                     <p className="text-lg font-caustenbold text-primary">
                        Products
                     </p>
                     <div className="flex gap-5 items-center">
                        <button className="text-lg font-caustenbold text-blueBar">
                           New
                        </button>
                        <button className="text-lg font-caustenbold text-primary">
                           Recommended
                        </button>
                        <CiFilter
                           onClick={toogleSidebar}
                           className="text-lg text-primary cursor-pointer md:hidden"
                        />
                     </div>
                  </div>
                  {/* End Heading  */}

                  {/* Product Grid  */}
                  <ListingGrid />
                  {/* End Product Grid  */}
                  <button className="block mx-auto font-caustenbold text-lg md:text-xl px-10 md:px-16 py-2 md:py-3 text-white bg-primary rounded-md my-10 hover:text-white hover:bg-blueBar transition-colors duration-200 ease-in-out">
                     Load More
                  </button>
                  <Pagination />
               </div>
               {/* End Products  */}
            </div>
         </div>
      </section>
   )
}

export default CategoryLayout