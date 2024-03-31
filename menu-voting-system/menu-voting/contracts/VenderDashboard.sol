// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VendorDashboard {
    struct VendorMetrics {
        uint256 totalSales;
        uint256 totalOrders;
        uint256 averageRating;
    }

    mapping(address => VendorMetrics) public vendorMetrics;
    mapping(address => bool) public isAdmin;

    event OrderPlaced(address vendor, uint256 amount);
    event RatingUpdated(address vendor, uint256 rating);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    function placeOrder(address _vendor, uint256 _amount) public {
        vendorMetrics[_vendor].totalSales += _amount;
        vendorMetrics[_vendor].totalOrders++;
        emit OrderPlaced(_vendor, _amount);
    }

    function updateRating(address _vendor, uint256 _rating) public onlyAdmin {
        vendorMetrics[_vendor].averageRating = _rating;
        emit RatingUpdated(_vendor, _rating);
    }
}
