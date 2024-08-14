import React, { useState, useEffect } from "react";
import PageTitle from "../../components/dashboard/Typography/PageTitle";
import { Link, NavLink, useOutlet, useOutletContext } from "react-router-dom";
import {
   EditIcon,
   EyeIcon,
   GridViewIcon,
   HomeIcon,
   ListViewIcon,
   TrashIcon,
} from "../../assets/dashboard/icons";
import {
   Card,
   CardBody,
   Label,
   Select,
   Button,
   TableBody,
   TableContainer,
   Table,
   TableHeader,
   TableCell,
   TableRow,
   TableFooter,
   Avatar,
   Badge,
   Pagination,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
} from "@windmill/react-ui";
import response from "../../utils/demo/productData";
import Icon from "../../components/dashboard/Icon";
import { genRating } from "../../utils/genarateRating";
import ProductContract from "../../contracts/Product.contract.ts";
import { formatToEth } from "../../utils/functionUtils.js";

const ProductsAll = () => {

   const { web3Provider, address } = useOutletContext();

   const [products, setProducts] = useState([]);

   const getProducts = async () => {
      if (web3Provider && address) {
         try {
            const productContract = new ProductContract();
            const productList = await productContract.getProductsFromOwner(address);
            const listProducts = [];
            for (let i = 0; i < productList.length; i++) {
               if (productList[i].productState === 0) {
                  listProducts.push(convertObjectProduct(productList[i]));
               }
            }
            setProducts(listProducts.reverse());
         } catch (error) {
            setProducts([]);
         }
      }
   }

   const convertObjectProduct = (data) => {
      return {
         uid: data.uid,
         consumer: data.consumer,
         owner: data.owner,
         productDetails: {
            code: data.productDetails.code.toString(),
            date: data.productDetails.date.toNumber(),
            description: data.productDetails.description,
            image: data.productDetails.image,
            name: data.productDetails.name,
            price: formatToEth(data.productDetails.price),
            size: data.productDetails.size,
         },
         seller: {
            addressShop: data.seller.addressShop,
            name: data.seller.name,
            sellerAddress: data.seller.sellerAddress
         }
      }
   }

   useEffect(() => {
      getProducts();
   }, [address])

   /* */
   const [view, setView] = useState("grid");

   // Table and grid data handlling
   const [page, setPage] = useState(1);
   const [data, setData] = useState([]);

   // pagination setup
   const [resultsPerPage, setResultsPerPage] = useState(10);
   const totalResults = response.length;

   // pagination change control
   function onPageChange(p) {
      setPage(p);
   }

   useEffect(() => {
      setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
   }, [page, resultsPerPage]);

   // Delete action model
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
   async function openModal(productId) {
      let product = data.filter((product) => product.id === productId)[0];
      // console.log(product);
      setSelectedDeleteProduct(product);
      setIsModalOpen(true);
   }

   function closeModal() {
      setIsModalOpen(false);
   }

   // Handle list view
   const handleChangeView = () => {
      if (view === "list") {
         setView("grid");
      }
      if (view === "grid") {
         setView("list");
      }
   };

   return (
      <div>
         <PageTitle>All Products</PageTitle>

         {/* Breadcum */}
         <div className="flex text-gray-800 dark:text-gray-300">
            <div className="flex items-center text-purple-600">
               <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
               <NavLink exact="true" to="/app/dashboard" className="mx-2">
                  Dashboard
               </NavLink>
            </div>
            {">"}
            <p className="mx-2">All Products</p>
         </div>

         {/* Sort */}
         <Card className="mt-5 mb-5 shadow-md">
            <CardBody>
               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        All Products
                     </p>

                     <Label className="mx-3">
                        <Select className="py-3">
                           <option>Sort by</option>
                           <option>Asc</option>
                           <option>Desc</option>
                        </Select>
                     </Label>

                     <Label className="mx-3">
                        <Select className="py-3">
                           <option>Filter by Category</option>
                           <option>Electronics</option>
                           <option>Cloths</option>
                           <option>Mobile Accerssories</option>
                        </Select>
                     </Label>

                     <Label className="mr-8">
                        {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                        <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                           <input
                              className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                              placeholder="Number of Results"
                              value={resultsPerPage}
                              onChange={(e) => setResultsPerPage(e.target.value)}
                           />
                           <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                              {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                              Results on {`${view}`}
                           </div>
                        </div>
                     </Label>
                  </div>
                  <div className="">
                     <Button
                        icon={view === "list" ? ListViewIcon : GridViewIcon}
                        className="p-2"
                        aria-label="Edit"
                        onClick={handleChangeView}
                     />
                  </div>
               </div>
            </CardBody>
         </Card>

         {/* Delete product model */}
         <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader className="flex items-center">
               {/* <div className="flex items-center"> */}
               <Icon icon={TrashIcon} className="w-6 h-6 mr-3" />
               Delete Product
               {/* </div> */}
            </ModalHeader>
            <ModalBody>
               Make sure you want to delete product{" "}
               {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
            </ModalBody>
            <ModalFooter>
               {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
               <div className="hidden sm:block">
                  <Button layout="outline" onClick={closeModal}>
                     Cancel
                  </Button>
               </div>
               <div className="hidden sm:block">
                  <Button>Delete</Button>
               </div>
               <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClick={closeModal}>
                     Cancel
                  </Button>
               </div>
               <div className="block w-full sm:hidden">
                  <Button block size="large">
                     Delete
                  </Button>
               </div>
            </ModalFooter>
         </Modal>

         {/* Product Views */}
         {view === "list" ? (
            <>
               <TableContainer className="mb-8">
                  <Table>
                     <TableHeader>
                        <tr>
                           <TableCell>Code</TableCell>
                           <TableCell>Name</TableCell>
                           <TableCell>Price</TableCell>
                           <TableCell>Rating</TableCell>
                           <TableCell>Description</TableCell>
                           <TableCell>Size</TableCell>
                        </tr>
                     </TableHeader>
                     <TableBody>
                        {products.length > 0 && products.map((product) => (
                           <TableRow key={product.uid}>
                              <TableCell className="text-sm w-7">{product.productDetails.code}</TableCell>
                              <TableCell>
                                 <div className="flex items-center text-sm">
                                    <Avatar
                                       className="hidden mr-4 md:block"
                                       src={product.productDetails.image}
                                       alt="Product image"
                                    />
                                    <div>
                                       <p className="font-semibold">{product.productDetails.name}</p>
                                    </div>
                                 </div>
                              </TableCell>
                              <TableCell className="text-sm">{product.productDetails.price}</TableCell>
                              <TableCell className="text-sm">
                                 {genRating(product.rating, 4, 5)}
                              </TableCell>
                              <TableCell className="text-sm" style={{ width: '100px' }}>{product.productDetails.description}</TableCell>
                              <TableCell className="text-sm">{product.productDetails.size}</TableCell>
                              <TableCell>
                                 <div className="flex">
                                    <Link to={`#`}>
                                       <Button
                                          icon={EyeIcon}
                                          className="mr-3"
                                          aria-label="Preview"
                                       />
                                    </Link>
                                    <Button
                                       icon={EditIcon}
                                       className="mr-3"
                                       layout="outline"
                                       aria-label="Edit"
                                    />
                                    <Button
                                       icon={TrashIcon}
                                       layout="outline"
                                       onClick={() => openModal(product.uid)}
                                       aria-label="Delete"
                                    />
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
                  <TableFooter>
                     <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                     />
                  </TableFooter>
               </TableContainer>
            </>
         ) : (
            <>
               {/* Car list */}
               <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
                  {products.length && products.map((product) => (
                     <div className="" key={product.uid}>
                        <Card>
                           <img
                              className="object-cover w-full max-h-[300px]"
                              src={product.productDetails.image}
                              alt="product"
                           />
                           <CardBody>
                              <div className="mb-3 flex items-center justify-between">
                                 <p className="font-semibold truncate  text-gray-600 dark:text-gray-300">
                                    {product.productDetails.name}
                                 </p>
                                 <Badge
                                    type={"danger"}
                                    className="whitespace-nowrap"
                                 >
                                    <p className="break-normal">
                                       {product.seller.addressShop}
                                    </p>
                                 </Badge>
                              </div>

                              <p className="mb-2 text-purple-500 font-bold text-lg">
                                 {product.price}
                              </p>

                              <p className="mb-2 text-gray-600 dark:text-gray-400">
                                 Thông qua review, người dùng chia sẻ trải nghiệm {product.productDetails.description}
                              </p>

                              <div className="flex items-center justify-between">
                                 <div>
                                    <Link to={''}>
                                       <Button
                                          icon={EyeIcon}
                                          className="mr-3"
                                          aria-label="Preview"
                                          size="small"
                                       />
                                    </Link>
                                 </div>
                                 <div>
                                    <Button
                                       icon={EditIcon}
                                       className="mr-3"
                                       layout="outline"
                                       aria-label="Edit"
                                       size="small"
                                    />
                                    <Button
                                       icon={TrashIcon}
                                       layout="outline"
                                       aria-label="Delete"
                                       onClick={() => openModal(product.id)}
                                       size="small"
                                    />
                                 </div>
                              </div>
                           </CardBody>
                        </Card>
                     </div>
                  ))}
               </div>

               <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  label="Table navigation"
                  onChange={onPageChange}
               />
            </>
         )}
      </div>
   );
};

export default ProductsAll;
