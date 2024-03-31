// src/components/MealRatingComponent.js
import React, { useState, useEffect } from 'react';
import getWeb3 from '../web3';
import getContracts from '../contract';

const MealRatingComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [mealRating, setMealRating] = useState(null);
  const [mealReviews, setMealReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const contracts = await getContracts(web3Instance);
        setWeb3(web3Instance);
        setMealRating(contracts.mealRating);

        const reviews = await mealRating.methods.getAllReviews().call();
        setMealReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const submitReview = async () => {
    try {
      await mealRating.methods.reviewMeal(rating, review).send({ from: web3.eth.accounts[0] });
      setHasReviewed(true);
      // Update UI or show confirmation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Meal Rating</h1>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
      </div>
      <div>
        <label>Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
      </div>
      <button onClick={submitReview}>Submit Review</button>
      {hasReviewed && <p>You have successfully submitted your review!</p>}
      <h2>Recent Reviews:</h2>
      <ul>
        {mealReviews.map((review) => (
          <li key={review.id}>
            <strong>Rating:</strong> {review.rating} - <strong>Review:</strong>{' '}
            {review.review}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealRatingComponent;
