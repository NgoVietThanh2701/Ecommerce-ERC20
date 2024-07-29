// SPDX-License-Identifier: NONE
pragma solidity ^0.8.19;

library Structure {
    enum State {
        SoldBySeller,
        PurchasedByConsumer,
        DeliveryToShipper,
        ShipByShipper,
        ReceiveByConsumer
    }

    struct ProductDetails {
        string name;
        string code;
        uint256 price;
        string image;
        string description;
        string size;
        uint256 date;
    }

    struct Product {
        uint256 uid;
        address owner;
        State productState;
        ProductDetails productDetails;
        Shipper shipper;
        Seller seller;
        address consumer;
    }

    struct Seller {
        address sellerAddress;
        string name;
        string image;
    }

    struct Shipper {
        address shipperAddress;
        string name;
        uint256 feeShip;
    }

    enum Roles {
        Seller,
        Shipper
    }
}
