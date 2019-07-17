# Truffle

## Deployment
`truffle migrate --network regtest`


## Call Smart Contract Methods
1. Start truffle console `truffle console --network regtest`
1. Mint Token by `Coin.deployed().then((instance=>instance.mint('toAddress',amount)))`
1. Send Token to other address by `Coin.deployed().then((instance=>instance.send('toAddress',amount)))`

## Network Config
In order to use `--network regtest` in above commands, you need to make sure in truffle-config.js the networks setting include regtest

```js
networks: {
    regtest: {
      provider: new PrivateKeyProvider(privateKey, "http://127.0.0.1:4444"),
      host: "127.0.0.1",
      port: 4444,
      network_id: 33,
    }
},
```