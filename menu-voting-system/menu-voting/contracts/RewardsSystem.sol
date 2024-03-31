// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RewardsSystem {
    mapping(address => uint256) public rewardsPoints;
    mapping(address => bool) public isAdmin;

    event PointsEarned(address user, uint256 points);
    event PointsRedeemed(address user, uint256 points);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    function earnPoints(address _user, uint256 _points) public onlyAdmin {
        rewardsPoints[_user] += _points;
        emit PointsEarned(_user, _points);
    }

    function redeemPoints(uint256 _points) public {
        require(rewardsPoints[msg.sender] >= _points, "Not enough points");
        rewardsPoints[msg.sender] -= _points;
        emit PointsRedeemed(msg.sender, _points);
    }
}
