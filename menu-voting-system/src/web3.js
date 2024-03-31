// src/web3.js
import Web3 from 'web3';

const getWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    return window.web3;
  }
  throw new Error('Web3 provider not found');
};

export default getWeb3;
