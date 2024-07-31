import { Link } from "react-router-dom";

const CategoryGrid = ({ categories }) => {
   return (
      <div className="grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {categories.map((category, index) => (
            <div className="flex flex-col gap-5 " key={index}>
               <Link
                  to={"/category/" + category.id}
                  className="text-black rounded-lg overflow-hidden w-full"
               >
                  <img src={category.image} alt="product" className="w-full" />
               </Link>
               <div className="meta">
                  <p className="font-caustenbold text-[#2A2f2f]">{category.name}</p>
                  <Link
                     to={`/category/${category.id}`}
                     className="text-sm font-caustenmedium text-[#7f7f7f]"
                  >
                     Explore Now!
                  </Link>
               </div>
            </div>
         ))}
      </div>
   );
};

export default CategoryGrid;
