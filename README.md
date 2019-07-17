# Ganache with RSK

## RSKJ Docker
1. Install Docker
1. Navigate to under /docker, run `docker build -t regtest -f Dockerfile.RegTest .` This comamnd will build download Rskj node and build the image.
1. Once built, we can start a container with the image using `docker run -d --name regtest-node-01 -p 4444:4444 -p 4445:4445 -p 30305:30305 regtest`. This command will start Rskj node with port 4444, 4445 and 30305 open

## Ganache
1. Navigate to under /ganache
1. `npm install`. This will install required dependencies for ganache
1. `npm start` will start Ganache in development environment

## Truffle
1. Navigate to under /truffle
1. `npm install`
1. `truffle migrate --network regtest` to deploy Coin smart contract
1. Once deployed, run `truffle console --network regtest`. The Coin variable is already defined in the console.
1. In truffle console, mint Coin by `Coin.deployed().then((instance=>instance.mint("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826", 100)))`
1. Then, send Coin by `Coin.deployed().then((instance=>instance.send('0x7986b3DF570230288501EEa3D890bd66948C9B79',50)))`