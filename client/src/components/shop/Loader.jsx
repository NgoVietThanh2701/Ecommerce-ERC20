const Loader = () => {
   return (
      <div className="flex items-center justify-center h-screen">
         <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-gray-900 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-4 h-4 bg-gray-900 rounded-full animate-bounce custom-animation"></div>
         </div>
      </div>
   );
};

export default Loader;
