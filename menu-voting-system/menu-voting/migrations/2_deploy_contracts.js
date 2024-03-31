// migrations/2_deploy_contracts.js

const MenuVoting = artifacts.require("MenuVoting");
const MealRating = artifacts.require("MealRating");
const RewardsSystem = artifacts.require("RewardsSystem");
const VendorDashboard = artifacts.require("VendorDashboard");
const QRCodeGenerator = artifacts.require("QRCodeGenerator");
const AccessControl = artifacts.require("AccessControl");

module.exports = function (deployer) {
  deployer.deploy(MenuVoting);
  deployer.deploy(MealRating);
  deployer.deploy(RewardsSystem);
  deployer.deploy(VendorDashboard);
  deployer.deploy(QRCodeGenerator);
  deployer.deploy(AccessControl);
};
