let bip39 = require("bip39");
let hdkey = require("ethereumjs-wallet/hdkey");
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

module.exports = generateAddressesFromSeed;
