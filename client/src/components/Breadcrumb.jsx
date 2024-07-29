import { Link } from "react-router-dom";

const Breadcrumb = ({ links }) => {
   return (
      <ul className="breadcrumb text-lg font-caustenmedium text-secondary flex gap-8">
         {links.map((link) => (
            <li key={link.id}>
               <Link to={link.url}>{link.text}</Link>
            </li>
         ))}
      </ul>
   );
};

export default Breadcrumb;
