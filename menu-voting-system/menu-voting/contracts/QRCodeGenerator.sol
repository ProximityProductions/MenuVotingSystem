// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QRCodeGenerator {
    mapping(uint256 => string) public qrCodes;
    mapping(address => bool) public isAdmin;

    event QRCodeGenerated(uint256 itemId, string qrCode);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    function generateQRCode(uint256 _itemId, string memory _qrCode) public onlyAdmin {
        qrCodes[_itemId] = _qrCode;
        emit QRCodeGenerated(_itemId, _qrCode);
    }

    function getQRCode(uint256 _itemId) public view returns (string memory) {
        return qrCodes[_itemId];
    }
}
