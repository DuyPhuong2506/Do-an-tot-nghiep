pragma solidity ^0.6.1;

contract Products{
    uint public id;
    string public name;
    uint public price;

    Marketplace parentContract;
    
    constructor(Marketplace _parentContract,uint _id, string memory _name,uint _price) public {
        id = _id;
        name = _name;
        price = _price;
        parentContract = _parentContract;
    }
    
}

contract Marketplace{
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        Products products;
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        Products products,
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Dapp University Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        Products item = new Products(this, productCount, _name, _price);
        products[productCount] = Product(item,productCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(item,productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        payable(address(_seller)).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
    function purchaseProductbyToken(uint _id) public virtual {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
    // function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    //     _transfer(_msgSender(), recipient, amount);
    //     return true;
    // }
    // function _transfer(
    //     address sender,
    //     address recipient,
    //     uint256 amount
    // ) internal virtual {
    //     require(sender != address(0), "ERC20: transfer from the zero address");
    //     require(recipient != address(0), "ERC20: transfer to the zero address");

    //     _beforeTokenTransfer(sender, recipient, amount);

    //     uint256 senderBalance = _balances[sender];
    //     require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
    //     unchecked {
    //         _balances[sender] = senderBalance - amount;
    //     }
    //     _balances[recipient] += amount;

    //     emit Transfer(sender, recipient, amount);

    //     _afterTokenTransfer(sender, recipient, amount);
    // }
}
