// SPDX-License-Identifier: NONE
pragma solidity ^0.8.19;

import "./Structure.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol"; /*revert when transaction failed */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Product {
    IERC20 private token;
    uint uid;
    address public admin;

    mapping(uint256 => Structure.Product) products;
    Structure.Seller[] rolesSeller;
    Structure.Shipper[] rolesShipper;

    constructor(address _admin, IERC20 _token) {
        admin = _admin;
        token = _token;
        uid = 0;
    }

    event SoldBySeller(uint256 uid);
    event PurchasedByConsumer(uint256 uid);
    event DeliveryToShipper(uint256 uid);
    event ShipByShipper(uint256 uid);
    event ReceiveByConsumer(uint256 uid);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Sender is not a admin");
        _;
    }

    /* check sender is a ownerProduct or not*/
    modifier verifyOwnerProduct(address _address) {
        require(msg.sender == _address, "Sender is not owner product");
        _;
    }

    /* check state of product*/
    modifier soldBySeller(uint256 _uid) {
        require(products[_uid].productState == Structure.State.SoldBySeller);
        _;
    }

    modifier purchasedByConsumer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByConsumer
        );
        _;
    }

    modifier deliveryToShipper(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.DeliveryToShipper
        );
        _;
    }

    modifier shipByShipper(uint256 _uid) {
        require(products[_uid].productState == Structure.State.ShipByShipper);
        _;
    }

    modifier receiveByConsumer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceiveByConsumer
        );
        _;
    }

    function addSeller(
        address _address,
        string memory _name,
        string memory _image
    ) public onlyAdmin {
        require(_address != address(0));
        Structure.Seller memory sellerInfo = Structure.Seller({
            sellerAddress: _address,
            name: _name,
            image: _image
        });
        rolesSeller.push(sellerInfo);
    }

    function isSeller(address _address) public view returns (bool) {
        require(_address != address(0));
        for (uint256 i = 0; i < rolesSeller.length; i++) {
            if (rolesSeller[i].sellerAddress == _address) {
                return true;
            }
        }
        return false;
    }

    function addShipper(
        address _address,
        string memory _name,
        uint256 _feeShip
    ) public onlyAdmin {
        require(_address != address(0));
        Structure.Shipper memory shipperInfo = Structure.Shipper({
            shipperAddress: _address,
            name: _name,
            feeShip: _feeShip
        });
        rolesShipper.push(shipperInfo);
    }

    function isShipper(address _address) public view returns (bool) {
        require(_address != address(0));
        for (uint256 i = 0; i < rolesShipper.length; i++) {
            if (rolesShipper[i].shipperAddress == _address) {
                return true;
            }
        }
        return false;
    }

    // Step 1
    function soldProduct(
        string memory _name,
        string memory _code,
        uint256 _price,
        string memory _image,
        string memory _description,
        string memory _size
    ) public {
        require(isSeller(msg.sender), "Sender is not a Seller!");
        Structure.Product memory product;
        product.uid = uid;
        Structure.Seller memory infoSeller = getSellerByAddress(msg.sender);
        product.owner = msg.sender;
        product.seller = infoSeller;
        /* set details for product*/
        product.productDetails.name = _name;
        product.productDetails.code = _code;
        product.productDetails.price = _price;
        product.productDetails.image = _image;
        product.productDetails.description = _description;
        product.productDetails.size = _size;
        product.productDetails.date = block.timestamp;
        /* set state for product */
        product.productState = Structure.State.SoldBySeller;

        /* add product to list */
        products[uid] = product;
        emit SoldBySeller(uid);
        uid++;
    }

    // Step 2
    function purchasedProduct(
        uint256 _uid,
        address _shipperAddress
    ) public soldBySeller(_uid) {
        Structure.Shipper memory infoShipper = getShipperByAddress(
            _shipperAddress
        );
        require(
            token.balanceOf(msg.sender) >=
                products[_uid].productDetails.price + infoShipper.feeShip,
            "Insufficient account balance"
        );
        uint256 amountPrice = products[_uid].productDetails.price +
            infoShipper.feeShip;
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            amountPrice
        );
        products[_uid].shipper = infoShipper;
        products[_uid].consumer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByConsumer;
        emit PurchasedByConsumer(_uid);
    }

    // Step 3
    function deliveryProduct(
        uint256 _uid
    )
        public
        purchasedByConsumer(_uid)
        verifyOwnerProduct(products[_uid].owner)
    {
        require(isSeller(msg.sender), "Sender is not a Seller!");
        products[_uid].owner = products[_uid].shipper.shipperAddress;
        products[_uid].productState = Structure.State.DeliveryToShipper;
        emit DeliveryToShipper(_uid);
    }

    // Step 4
    function shipProduct(
        uint256 _uid
    ) public deliveryToShipper(_uid) verifyOwnerProduct(products[_uid].owner) {
        require(isShipper(msg.sender), "Sender is not a shipper!");
        products[_uid].productState = Structure.State.ShipByShipper;
        emit ShipByShipper(_uid);
    }

    // Step 5
    function receiveProduct(
        uint256 _uid
    ) public shipByShipper(_uid) verifyOwnerProduct(products[_uid].consumer) {
        SafeERC20.safeTransfer(
            token,
            products[_uid].seller.sellerAddress,
            (products[_uid].productDetails.price * 9) / 10
        );
        SafeERC20.safeTransfer(
            token,
            products[_uid].shipper.shipperAddress,
            (products[_uid].shipper.feeShip * 9) / 10
        );
        SafeERC20.safeTransfer(
            token,
            admin,
            (products[_uid].productDetails.price * 1) / 10
        );
        SafeERC20.safeTransfer(
            token,
            admin,
            (products[_uid].shipper.feeShip * 1) / 10
        );
        products[_uid].productState = Structure.State.ReceiveByConsumer;
        products[_uid].owner = products[_uid].consumer;
        emit ReceiveByConsumer(_uid);
    }

    // Get all Seller
    function GetSellers()
        public
        view
        onlyAdmin
        returns (Structure.Seller[] memory)
    {
        uint256 length = rolesSeller.length;
        Structure.Seller[] memory listSeller = new Structure.Seller[](length);
        for (uint256 i = 0; i < length; i++) {
            listSeller[i] = rolesSeller[i];
        }
        return listSeller;
    }

    function getSellerByAddress(
        address _address
    ) public view returns (Structure.Seller memory) {
        require(_address != address(0));
        require(isSeller(_address), "Seller is not exists");
        uint256 idSeller;
        for (uint256 i = 0; i < rolesSeller.length; i++) {
            if (rolesSeller[i].sellerAddress == _address) {
                idSeller = i;
            }
        }
        return rolesSeller[idSeller];
    }

    // Get all Shippers
    function GetShippers()
        public
        view
        onlyAdmin
        returns (Structure.Shipper[] memory)
    {
        uint256 length = rolesShipper.length;
        Structure.Shipper[] memory listShipper = new Structure.Shipper[](
            length
        );
        for (uint256 i = 0; i < length; i++) {
            listShipper[i] = rolesShipper[i];
        }
        return listShipper;
    }

    function getShipperByAddress(
        address _address
    ) public view returns (Structure.Shipper memory) {
        require(_address != address(0));
        require(isShipper(_address), "Shipper is not exists");
        uint256 idShipper;
        for (uint256 i = 0; i < rolesShipper.length; i++) {
            if (rolesShipper[i].shipperAddress == _address) {
                idShipper = i;
            }
        }
        return rolesShipper[idShipper];
    }

    /// @dev Get all product
    function getProducts() public view returns (Structure.Product[] memory) {
        Structure.Product[] memory listProduct = new Structure.Product[](
            uid + 1
        );
        for (uint256 i = 0; i <= uid; i++) {
            listProduct[i] = products[i];
        }
        return listProduct;
    }

    /* check code of product is exist or not */
    function checkProductCode(string memory _code) public view returns (bool) {
        for (uint256 i = 0; i <= uid; i++) {
            if (
                keccak256(bytes(products[i].productDetails.code)) ==
                keccak256(bytes(_code))
            ) {
                return true;
            }
        }
        return false;
    }

    ///@dev Get product by code
    function getProductByCode(
        string memory _code
    ) public view returns (Structure.Product memory) {
        require(checkProductCode(_code), "Code product is not exists");
        uint256 idProduct;
        for (uint256 i = 1; i < uid; i++) {
            if (
                keccak256(bytes(products[i].productDetails.code)) ==
                keccak256(bytes(_code))
            ) {
                idProduct = i;
            }
        }
        return products[idProduct];
    }

    function checkOwnerProduct(address _address) public view returns (bool) {
        for (uint256 i = 0; i <= uid; i++) {
            if (products[i].owner == _address) {
                return true;
            }
        }
        return false;
    }

    // @dev get count of Products
    function getCountProducts(address _address) public view returns (uint256) {
        uint256 count = 0;
        for (uint i = 0; i <= uid; i++) {
            if (products[i].owner == _address) {
                count++;
            }
        }
        return count;
    }

    ///@dev Get products by address
    function getProductsFromOwner(
        address _address
    ) public view returns (Structure.Product[] memory) {
        require(checkOwnerProduct(_address), "Sender is not owner");
        uint256 count = getCountProducts(_address);
        Structure.Product[] memory listProduct = new Structure.Product[](count);
        uint256 j = 0;
        for (uint256 i = 0; i <= uid; i++) {
            if (products[i].owner == _address) {
                listProduct[j] = products[i];
                j++;
            }
        }
        return listProduct;
    }
}
