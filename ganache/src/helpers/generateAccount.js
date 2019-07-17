let bip39 = require("bip39");
let hdkey = require("ethereumjs-wallet/hdkey");

let keccak256 = require("web3").utils.keccak256;

function generateAccountByCow() {
  let cow = "cow";
  let countOfKeys = 10;
  let privateKeys = [];
  privateKeys.push(keccak256(cow));
  for (let i = 1; i < countOfKeys; i++) {
    privateKeys.push(keccak256(cow + i));
  }
  return privateKeys;
}
module.exports = { generateAccountByCow };
