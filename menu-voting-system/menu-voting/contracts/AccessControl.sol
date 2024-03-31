// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isVendor;

    event AdminAdded(address admin);
    event VendorAdded(address vendor);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    modifier onlyVendor() {
        require(isVendor[msg.sender], "Only vendor can perform this action");
        _;
    }

    function addAdmin(address _admin) public onlyAdmin {
        isAdmin[_admin] = true;
        emit AdminAdded(_admin);
    }

    function addVendor(address _vendor) public onlyAdmin {
        isVendor[_vendor] = true;
        emit VendorAdded(_vendor);
    }
}
