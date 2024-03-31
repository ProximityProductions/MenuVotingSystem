// src/components/VendorDashboardComponent.js
import React, { useState, useEffect } from 'react';
import getContracts from '../contract';

const VendorDashboardComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [vendorDashboard, setVendorDashboard] = useState(null);
  const [vendorMetrics, setVendorMetrics] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const contracts = await getContracts(web3Instance);
        setWeb3(web3Instance);
        setVendorDashboard(contracts.vendorDashboard);

        const metrics = await vendorDashboard.methods.vendorMetrics(web3.eth.accounts[0]).call();
        setVendorMetrics(metrics);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const updateRating = async () => {
    try {
      // Assuming the admin can update the rating to a fixed value for simplicity
      const newRating = 4; // New rating value
      await vendorDashboard.methods.updateRating(newRating).send({ from: web3.eth.accounts[0] });
      setVendorMetrics({
        ...vendorMetrics,
        averageRating: newRating,
      });
      // Update UI or show confirmation
    } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h2>Vendor Dashboard</h2>
        <p>Total Sales: {vendorMetrics.totalSales}</p>
        <p>Total Orders: {vendorMetrics.totalOrders}</p>
        <p>Average Rating: {vendorMetrics.averageRating}</p>
        <button onClick={updateRating}>Update Rating</button>
      </div>
    );
  };
  
  export default VendorDashboardComponent;
  
