import { ethers } from "hardhat";
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { Contract } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

enum State {
   SoldBySeller,
   PurchasedByConsumer,
   DeliveryToShipper,
   ShipByShipper,
   ReceiveByConsumer
}

function parseEther(amount: number) {
   return ethers.utils.parseEther(amount.toString());
}

function formatEther(amount: number) {
   return Number.parseFloat(ethers.utils.formatEther(amount));
}

describe("---Product", function () {
   let admin: SignerWithAddress,
      seller: SignerWithAddress,
      shipper: SignerWithAddress,
      consumer: SignerWithAddress;
   let productContract: Contract;
   let token: Contract;

   beforeEach(async () => {
      await ethers.provider.send("hardhat_reset", []); /* reset network hardhat  */
      [admin, seller, shipper, consumer] = await ethers.getSigners();

      const TOKEN = await ethers.getContractFactory("LuckToken", admin);
      token = await TOKEN.deploy();
      const PRORDUCT = await ethers.getContractFactory("Product", admin);
      productContract = await PRORDUCT.deploy(admin.address, token.address);
   })

   /* positive testing */
   it("Create product", async () => {
      await productContract.connect(admin).addSeller(seller.address, "Shop ban cho", "dien duong, dien ban, quang nam");
      await productContract.connect(admin).addShipper(shipper.address, "DVVC nhanh", parseEther(15));
      const listSeller = await productContract.GetSellers();
      const listShipper = await productContract.GetShippers();
      console.log("check seller is", await productContract.isSeller(seller.address));
      console.log("check shipper is", await productContract.isShipper(shipper.address));
      expect(listSeller.some((value: any) => { return value.sellerAddress === seller.address })).equal(true);
      expect(listShipper.some((value: any) => { return value.shipperAddress === shipper.address })).equal(true);
      await token.transfer(consumer.address, parseEther(10 ** 3));
      const balanceSeller = formatEther(await token.balanceOf(seller.address));
      const balanceShipper = formatEther(await token.balanceOf(shipper.address));
      const balanceConsumer = formatEther(await token.balanceOf(consumer.address));
      const balanceAdmin = formatEther(await token.balanceOf(admin.address));
      const balanceContract = formatEther(await token.balanceOf(productContract.address));
      console.log("address seller:", seller.address, "|", balanceSeller);
      console.log("address shipper:", shipper.address, "|", balanceShipper);
      console.log("addess consumer:", consumer.address, "|", balanceConsumer);
      console.log("addess admin:", admin.address, "|", balanceAdmin);
      // -> Step 1
      await productContract.connect(seller).soldProduct("Dâu tây", "#dau123", parseEther(30), "http/farmer/image1", "description1", "M");
      let productByCode = await productContract.getProductByCode("#dau123");
      expect(productByCode.productState).equal(State.SoldBySeller);
      expect(productByCode.owner).equal(seller.address);
      // -> Step 2
      const shipperByAddress = await productContract.getShipperByAddress(shipper.address);
      const amountApprove = formatEther(productByCode.productDetails.price) + formatEther(shipperByAddress.feeShip);
      await token.connect(consumer).approve(productContract.address, parseEther(amountApprove));
      console.log("Consumer approve for contract: ", parseEther(amountApprove), "LCK")
      await productContract.connect(consumer).purchasedProduct(productByCode.uid, shipper.address);
      productByCode = await productContract.getProductByCode("#dau123");
      expect(formatEther(await token.balanceOf(consumer.address))).equal(balanceConsumer - formatEther(productByCode.productDetails.price) - formatEther(shipperByAddress.feeShip));
      expect(formatEther(await token.balanceOf(productContract.address))).equal(balanceContract + formatEther(productByCode.productDetails.price) + formatEther(shipperByAddress.feeShip));
      expect(productByCode.productState).equal(State.PurchasedByConsumer);
      // -> Step 3
      await productContract.connect(seller).deliveryProduct(productByCode.uid);
      productByCode = await productContract.getProductByCode("#dau123");
      expect(productByCode.owner).equal(shipper.address);
      expect(productByCode.productState).equal(State.DeliveryToShipper);
      // -> Step 4
      await productContract.connect(shipper).shipProduct(productByCode.uid);
      productByCode = await productContract.getProductByCode("#dau123");
      expect(productByCode.productState).equal(State.ShipByShipper);
      // -> Step 5
      await productContract.connect(consumer).receiveProduct(productByCode.uid);
      productByCode = await productContract.getProductByCode("#dau123");
      expect(productByCode.owner).equal(consumer.address);
      expect(productByCode.productState).equal(State.ReceiveByConsumer);
      expect(formatEther(await token.balanceOf(seller.address))).equal(balanceSeller + formatEther(productByCode.productDetails.price) * 9 / 10);
      expect(formatEther(await token.balanceOf(shipper.address))).equal(balanceShipper + formatEther(productByCode.shipper.feeShip) * 9 / 10);
      expect(formatEther(await token.balanceOf(productContract.address))).equal(0);
      expect(formatEther(await token.balanceOf(admin.address))).equal(balanceAdmin + formatEther(productByCode.shipper.feeShip) / 10 + formatEther(productByCode.productDetails.price) / 10);
      console.log(await productContract.connect(seller).getTransactionsHistory());
      console.log(await productContract.connect(shipper).getTransactionsHistory());
      console.log(await productContract.connect(admin).getTransactionsHistory());
      const products = await productContract.getProducts();
      console.log("-------", products.length);
      console.log(products);
      console.log("ID: ", await productContract.uid());
   });

   // negative testing
   it("Should not grant role, sender is not admin!", async () => {
      await expect(productContract.connect(seller).addSeller(seller.address, "Shop ban cho", "http://image/seller")).revertedWith("Sender is not a admin");
   });
   it("Should not grant role, sender is not seller!", async () => {
      await expect(productContract.connect(seller).soldProduct("Dâu tây", "#dau123", parseEther(30), "http/farmer/image1", "description1", 3)).revertedWith("Sender is not a Seller!");
   });
   it("Should not grant role, sender is not shipper!", async () => {
      await expect(productContract.getProductByCode("#dau123")).revertedWith("Code product is not exists");
   });
   it("Get products when don't add product", async () => {
      const products = await productContract.getProducts();
      console.log(products);
      await expect(productContract.getProductsFromOwner(seller.address)).revertedWith("Sender is not owner");
      expect(products).to.deep.equal([]);
   });
})