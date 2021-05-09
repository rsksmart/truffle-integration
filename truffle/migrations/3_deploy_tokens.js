const ERC20 = artifacts.require('./tokens/ERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(ERC20, 10000, 'Simon Bucks', 1, 'SBX');
};
