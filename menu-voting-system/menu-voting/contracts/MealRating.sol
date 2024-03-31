// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MealRating {
    struct MealReview {
        uint256 id;
        address reviewer;
        uint256 rating;
        string review;
    }

    MealReview[] public mealReviews;
    mapping(address => bool) public isAdmin;

    event MealReviewed(uint256 id, address reviewer, uint256 rating, string review);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    function reviewMeal(uint256 _rating, string memory _review) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        uint256 id = mealReviews.length;
        mealReviews.push(MealReview(id, msg.sender, _rating, _review));
        emit MealReviewed(id, msg.sender, _rating, _review);
    }

    function getMealReview(uint256 _reviewId) public view returns (uint256, address, uint256, string memory) {
        require(_reviewId < mealReviews.length, "Invalid review ID");
        MealReview memory review = mealReviews[_reviewId];
        return (review.id, review.reviewer, review.rating, review.review);
    }
}
