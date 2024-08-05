import { ethers } from "ethers";
import { PRODUCT_ADDRESS, getAbiProduct, rpcProvider } from "./config.ts";
import BaseInterface from "./interfaces/BaseInterface.ts";

export default class ProductContract extends BaseInterface {
   constructor(provider?: ethers.providers.Web3Provider) {
      super(provider || rpcProvider, PRODUCT_ADDRESS, getAbiProduct());
      if (!provider) {
         this._contract = new ethers.Contract(this._contractAddress, this._abi, rpcProvider);
      }
   }

   async addSeller(address: string, name: string, addressShop: string) {
      await this._contract.addSeller(address, name, addressShop, this._option);
   }

   async addShipper(address: string, name: string, feeShip: string) {
      await this._contract.addShipper(address, name, feeShip, this._option);
   }

   // step 1
   async soldProduct(name: string, code: string, price: number, image: string, description: string, size: string) {
      await this._contract.soldProduct(name, code, price, image, description, size, this._option);
   }

   // step 2
   async purchasedProduct(uid: number, address: string) {
      await this._contract.purchasedProduct(uid, address, this._option);
   }

   // step 3
   async deliveryProduct(uid: number) {
      await this._contract.deliveryProduct(uid, this._option);
   }

   // step 4
   async shipProduct(uid: number) {
      await this._contract.shipProduct(uid, this._option);
   }

   async receiveProduct(uid: number) {
      await this._contract.receiveProduct(uid, this._option);
   }

   // get add seller
   async getSellers() {
      const sellers = await this._contract.GetSellers();
      return sellers;
   }

   async getShipperByAddress(address: string) {
      const shipper = await this._contract.getShipperByAddress(address);
      return shipper;
   }

   // get add shipper
   async getShippers() {
      const shippers = await this._contract.GetShippers();
      return shippers;
   }

   async getProducts() {
      const products = await this._contract.getProducts();
      return products;
   }

   async getProductByCode(code: string) {
      const product = await this._contract.getProductByCode(code);
      return product;
   }

   async getProductsFromOwner(address: string) {
      const products = await this._contract.getProductsFromOwner(address);
      return products;
   }

   // check address is seller?
   async isSeller(address: string) {
      const check = await this._contract.isSeller(address);
      return check;
   }

   async isShipper(address: string): Promise<boolean> {
      const check = await this._contract.isShipper(address);
      return check;
   }
}