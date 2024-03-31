// src/components/VotingComponent.js
import React, { useState, useEffect } from 'react';
import getContracts from '../contract';

const VotingComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [menuVoting, setMenuVoting] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const contracts = await getContracts(web3Instance);
        setWeb3(web3Instance);
        setMenuVoting(contracts.menuVoting);

        const items = await menuVoting.methods.getAllItems().call();
        setMenuItems(items);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const voteItem = async () => {
    try {
      await menuVoting.methods.vote(selectedItem).send({ from: web3.eth.accounts[0] });
      setHasVoted(true);
      // Update UI or show confirmation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Vote for Menu Items</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - Votes: {item.votes}
            <button onClick={() => setSelectedItem(item.id)} disabled={hasVoted}>
              Vote
            </button>
          </li>
        ))}
      </ul>
      {hasVoted && <p>You have successfully voted!</p>}
    </div>
  );
};

export default VotingComponent;
