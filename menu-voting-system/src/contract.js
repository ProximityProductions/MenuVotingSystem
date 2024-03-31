// src/contract.js
import {Web3} from 'web3';
const web3 = new Web3(window.ethereum);
import MealRatingContract from './contracts/MealRating.json';
import RewardsSystemContract from './contracts/RewardsSystem.json';
import VendorDashboardContract from './contracts/VendorDashboard.json';
import QRCodeGeneratorContract from './contracts/QRCodeGenerator.json';
import AccessControlContract from './contracts/AccessControl.json';

const contractAddress = "";
const contractAbi = require('../menu-voting/build/contracts/MealRating.json').abi
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress)

const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const menuVoting = new web3.eth.Contract(
    MenuVotingContract.abi,
    MenuVotingContract.networks[networkId] && MenuVotingContract.networks[networkId].address
  );
  const mealRating = new web3.eth.Contract(
    MealRatingContract.abi,
    MealRatingContract.networks[networkId] && MealRatingContract.networks[networkId].address
  );
  const rewardsSystem = new web3.eth.Contract(
    RewardsSystemContract.abi,
    RewardsSystemContract.networks[networkId] && RewardsSystemContract.networks[networkId].address
  );
  const vendorDashboard = new web3.eth.Contract(
    VendorDashboardContract.abi,
    VendorDashboardContract.networks[networkId] && VendorDashboardContract.networks[networkId].address
  );
  const qrCodeGenerator = new web3.eth.Contract(
    QRCodeGeneratorContract.abi,
    QRCodeGeneratorContract.networks[networkId] && QRCodeGeneratorContract.networks[networkId].address
  );
  const accessControl = new web3.eth.Contract(
    AccessControlContract.abi,
    AccessControlContract.networks[networkId] && AccessControlContract.networks[networkId].address
  );

  return {
    menuVoting,
    mealRating,
    rewardsSystem,
    vendorDashboard,
    qrCodeGenerator,
    accessControl,
  };
};

export default getContracts;
