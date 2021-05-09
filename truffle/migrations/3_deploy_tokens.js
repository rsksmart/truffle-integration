const ERC20 = artifacts.require('./tokens/ERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(ERC20, 'Simon Bucks', 'SBX');
};
