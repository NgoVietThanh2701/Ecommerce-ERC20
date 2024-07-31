import { useState } from "react";
const ProductDescription = () => {
   const [currentTab, setCurrentTab] = useState("description");

   return (
      <div className="flex flex-col gap-14 md:justify-between md:flex-row mb-10">
         <div className="w-full md:w-1/2">
            <div className="section_heading flex justify-start items-center gap-5">
               <div className="w-[7px] h-8 rounded-md bg-blueBar"></div>
               <h3 className="text-3xl font-core_sans_bold">Product Description</h3>
            </div>
            {/* Nav  */}
            <div className="tab flex flex-wrap items-center gap-6 py-2">
               <button
                  onClick={() => setCurrentTab("description")}
                  className={`tab-item relative text-lg font-caustenmedium ${currentTab === "description"
                     ? "text-primary active"
                     : "text-secondary"
                     } `}
               >
                  Description
               </button>
               <button
                  onClick={() => setCurrentTab("comments")}
                  className={`tab-item relative flex items-center gap-3 ${currentTab === "comments" ? "active" : ""
                     }`}
               >
                  <span
                     className={`text-lg font-caustenmedium ${currentTab === "comments" ? "text-primary" : "text-secondary"
                        } hover:text-primary`}
                  >
                     User comments
                  </span>
                  <span className="text-sm font-caustenmedium bg-blueBar text-white w-6 h-5 rounded-md">
                     21
                  </span>
               </button>
               <button
                  onClick={() => setCurrentTab("qa")}
                  className={`tab-item relative flex items-center gap-3 ${currentTab === "qa" ? "active" : ""
                     }`}
               >
                  <span
                     className={`text-lg font-caustenmedium ${currentTab === "qa" ? "text-primary" : "text-secondary"
                        } hover:text-primary`}
                  >
                     Question & Answer
                  </span>
                  <span className="text-sm font-caustenmedium bg-primary text-white w-6 h-5 rounded-md">
                     4
                  </span>
               </button>
            </div>

            {/* Content  */}
            <div className="w-full py-5">
               {currentTab === "description" ? (
                  <div className="description flex flex-col gap-6">
                     <p className="font-caustenregular text-secondary">
                        100% Bio-washed Cotton – makes the fabric extra soft & silky.
                        Flexible ribbed crew neck. Precisely stitched with no pilling &
                        no fading. Provide all-time comfort. Anytime, anywhere. Infinite
                        range of matte-finish HD prints.
                     </p>
                     {/* Chart  */}
                     <div className="chart grid grid-cols-3 bg-grayBG rounded-xl divide-solid divide-border">
                        <div className="chart-item space-y-1 py-6 pl-6 ">
                           <p className="text-secondary font-caustenregular">Fabric</p>
                           <p className="text-primary font-caustenmedium">
                              Bio-washed Cotton
                           </p>
                        </div>
                        <div className="chart-item space-y-1 py-6 pl-6 ">
                           <p className="text-secondary font-caustenregular">Pattern</p>
                           <p className="text-primary font-caustenmedium">Printed</p>
                        </div>
                        <div className="chart-item space-y-1 py-6 pl-6 ">
                           <p className="text-secondary font-caustenregular">Fit</p>
                           <p className="text-primary font-caustenmedium">Regular-fit</p>
                        </div>
                        <div className="chart-item space-y-1 py-4 px-8 ">
                           <p className="text-secondary font-caustenregular">Neck</p>
                           <p className="text-primary font-caustenmedium">Round Neck</p>
                        </div>
                        <div className="chart-item space-y-1 py-4 px-8 ">
                           <p className="text-secondary font-caustenregular">Sleeve</p>
                           <p className="text-primary font-caustenmedium">
                              Half-sleeves
                           </p>
                        </div>
                        <div className="chart-item space-y-1 py-4 px-8 ">
                           <p className="text-secondary font-caustenregular">Style</p>
                           <p className="text-primary font-caustenmedium">Casual Wear</p>
                        </div>
                     </div>
                  </div>
               ) : currentTab === "comments" ? (
                  <div className="comments flex flex-col gap-6">
                     <textarea
                        placeholder="Your feedback."
                        className="border border-border rounded-xl p-4"
                     ></textarea>
                     <button className="bg-primary text-white px-8 py-3  block mx-auto rounded-lg">
                        Submit
                     </button>
                  </div>
               ) : currentTab === "qa" ? (
                  <div className="qa flex flex-col gap-6">
                     <h3>Faqs</h3>
                  </div>
               ) : (
                  ""
               )}
            </div>
         </div>
         <div className="w-full md:w-1/2 pt-14">
            <iframe
               className="w-full h-[350px] rounded-xl"
               src="https://previews.customer.envatousercontent.com/90ab538d-3350-4293-8dd1-300fe61826c5/watermarked_preview/watermarked_preview.mp4"
               title="T Shirt promotional Video 14"
               frameBorder="0"
               allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
               allowFullScreen
            ></iframe>
         </div>
      </div>
   );
};

export default ProductDescription;
