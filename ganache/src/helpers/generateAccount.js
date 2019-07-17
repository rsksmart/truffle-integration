let bip39 = require("bip39");
let hdkey = require("ethereumjs-wallet/hdkey");

let keccak256 = require("web3").utils.keccak256;
function generateAddressesFromSeed(mnemonic, count = 10) {
  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
  let wallet_hdpath = "m/44'/60'/0'/0/";
  let accounts = [];
  for (let i = 0; i < count; i++) {
    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    let address = "0x" + wallet.getAddress().toString("hex");
    let privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({ address: address, privateKey: privateKey });
  }
  return {
    wallet_hdpath,
    mnemonic,
    accounts,
  };
}

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
module.exports = { generateAccountByCow, generateAddressesFromSeed };
