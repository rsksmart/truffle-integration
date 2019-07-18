let keccak256 = require("web3").utils.keccak256;
const utils = require('ethereumjs-util');

 /**
  * Generate a series of private keys with keyword "cow", such as "cow", "cow1", "cow2" and etc.
  * This is to match auto-generated private keys in RSK regtest
  * @param {number} num number of keys to generate
  */
function generateKeyPairs(num) {
  let cow = "cow";
  const privateKeys = [];
  
  privateKeys.push(keccak256(cow));

  for (let i = 1; i < num; i++) {
    privateKeys.push(keccak256(cow + i));
  }

  const results = {};

  for(let i = 0 ; i<privateKeys.length; ++i){
    const privateKey = privateKeys[i];
    const publicKey = utils.privateToPublic(privateKey);
    let address = utils.publicToAddress(publicKey);
    address = `0x${address.toString('hex')}`;
    results[address] = privateKey;
  }

  return results;
}

module.exports = { generateKeyPairs };
