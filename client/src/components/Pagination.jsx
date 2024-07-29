import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const Pagination = () => {
   return (
      <div className="pagination">
         <div className="flex gap-4 items-center justify-end">
            <a href="#" className="pagination-item pagination-item_prev">
               <BsChevronLeft />
            </a>
            <a href="#" className="pagination-item">
               1
            </a>
            <a href="#" className="pagination-item active ">
               2
            </a>
            <a href="#" className="pagination-item ">
               3
            </a>
            <a href="#" className="pagination-item ">
               4
            </a>
            <a href="#" className="pagination-item pagination-item_next">
               <BsChevronRight />
            </a>
         </div>
      </div>
   );
};

export default Pagination;
