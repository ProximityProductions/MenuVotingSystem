// src/components/RewardsComponent.js
import React, { useState, useEffect } from 'react';
import getWeb3 from '../web3';
import getContracts from '../contract';

const RewardsComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [rewardsSystem, setRewardsSystem] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const contracts = await getContracts(web3Instance);
        setWeb3(web3Instance);
        setRewardsSystem(contracts.rewardsSystem);

        const userPoints = await rewardsSystem.methods.rewardsPoints(web3.eth.accounts[0]).call();
        setPoints(userPoints);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const redeemPoints = async (amount) => {
    try {
      await rewardsSystem.methods.redeemPoints(amount).send({ from: web3.eth.accounts[0] });
      // Update UI or show confirmation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Rewards System</h1>
      <p>Points: {points}</p>
      <button onClick={() => redeemPoints(10)}>Redeem 10 Points</button>
      <button onClick={() => redeemPoints(20)}>Redeem 20 Points</button>
      <button onClick={() => redeemPoints(50)}>Redeem 50 Points</button>
    </div>
  );
};

export default RewardsComponent;
