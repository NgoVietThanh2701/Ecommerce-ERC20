import { BiCommentDetail } from "react-icons/bi";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

const Ratings = ({ rating = 3.5, comment = 122 }) => {
   const fullStars = Math.floor(rating);
   const hasHalfStar = rating % 1 !== 0;

   const starsArray = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
         return "full"; // Full star
      } else if (index === fullStars && hasHalfStar) {
         return "half"; // Half star
      } else {
         return "empty"; // Empty star
      }
   });
   return (
      <div className="flex gap-10">
         <div className="flex gap-3 items-center cursor-pointer">
            {starsArray.map((star, index) => {
               if (star === "full") {
                  return <BsStarFill key={index} className="text-star text-lg" />;
               } else if (star === "half") {
                  return <BsStarHalf key={index} className="text-star text-lg" />;
               } else if (star === "empty") {
                  return <BsStar key={index} className="text-star text-lg" />;
               }
            })}
            <span className="text-lg font-caustenmedium text-secondary">
               {rating}
            </span>
         </div>

         <div className="flex gap-3 items-center cursor-pointer">
            <BiCommentDetail className="text-lg text-secondary" />
            <span className="text-lg font-caustenmedium text-secondary">
               {comment} comment
            </span>
         </div>
      </div>
   );
};

export default Ratings;
