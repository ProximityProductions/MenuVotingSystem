// src/App.js
import React from 'react';
import './App.css';
import VotingComponent from './components/VotingComponent';
import MealRatingComponent from './components/MealRatingComponent';
import RewardsComponent from './components/RewardsComponent';
import VendorDashboardComponent from './components/VendorDashboardComponent';
import QRCodeGeneratorComponent from './components/QRCodeGeneratorComponent';

function App() {
  return (
    <div className="App">
      <h1 className="title">Food Menu Voting System</h1>
      <div className="section">
        <VotingComponent />
      </div>
      <div className="section">
        <MealRatingComponent />
      </div>
      <div className="section">
        <RewardsComponent />
      </div>
      <div className="section">
        <VendorDashboardComponent />
      </div>
      <div className="section">
        <QRCodeGeneratorComponent />
      </div>
    </div>
  );
}

export default App;
