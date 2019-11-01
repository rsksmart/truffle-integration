# Ganache with RSK

## Note for For MAC OSX Developers 
1. Ensure you are running xcode directly and not the command-line instance. Run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

## Clone the RSK truffle-integration
1. git clone https://github.com/rsksmart/truffle-integration
1. cd truffle-integration/

## RSKJ Docker
Install Docker [(Windows/Mac OS](https://www.docker.com/products/docker-desktop) | [Ubuntu)](https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04) and make sure you are able to run `docker ps` at your terminal

Open a terminal
```bash 
cd /truffle-integration/docker # Where you've cloned the repo 
docker build --tag regtest -f Dockerfile.RegTest .
``` 
This comamnd will build download Rskj node and build the image. It takes about 10 mins for the first time downloading.

Once built, you can run an image container
```bash
docker run -d --name regtest-node-01 -p 4444:4444 -p 4445:4445 -p 30305:30305 regtest
``` 
This command will start an RSKJ node with port 4444, 4445 and 30305 open

To shut down or remove the active container

```bash
docker container list || docker kill <container id> || docker rm <container id>
``` 

### Linux users

Run docker commands with `sudo`

## RSKJ Docker Contribute
1. Sign in at https://hub.docker.com/ (or register a new account)

## Ganache
1. Make sure you are running the docker instance explained above.
1. Navigate to `/ganache`
1. `npm install`. This will install required dependencies for ganache
1. `npm start` will start Ganache in development environment

## Truffle
1. Navigate to `/truffle`
1. `npm install`
1. `truffle migrate --reset --network regtest` to deploy Coin smart contract. *run it twice to avoid truff issue #2224*
1. Once deployed, run `truffle console --network regtest`. The Coin variable is already defined in the console.
1. Mint Coin `Coin.deployed().then((instance=>instance.mint("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826", 100)))`
1. Then, send Coin by `Coin.deployed().then((instance=>instance.send('0x7986b3DF570230288501EEa3D890bd66948C9B79',50)))`
1. For the EIP20, check balance
`EIP20.deployed().then((instance=>instance.balanceOf("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826")))`
1. Transfer from the minter account to another account
`EIP20.deployed().then((instance=>instance.transfer("0x7986b3DF570230288501EEa3D890bd66948C9B79", 1)))`
1. Approve another account for certain allowance to spend
`EIP20.deployed().then((instance=>instance.approve("0x7986b3DF570230288501EEa3D890bd66948C9B79", 10)))`
1. Check the allowance is indeed existing
`EIP20.deployed().then((instance=>instance.allowance("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0x7986b3DF570230288501EEa3D890bd66948C9B79")))`
1. Switch to the other account in truffle ,truffle console --network regtestAccountTwo
1. Then execute this transfer `EIP20.deployed().then((instance=>instance.transferFrom("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826", "0x7986b3DF570230288501EEa3D890bd66948C9B79",3)))`

# FAQ:
## 1. How to link Truffle projects to Ganache?

1. To link a project, enter the settings by clicking the gear icon in the upper right.
![gear-icon](https://files.readme.io/1fb3ce7-WX20190730-1030452x.png)
1. You should be seeing the **WORKSPACE** settings pane; if not, you can get there by clicking the **WORKSPACE** tab in the top left.
![workspace](https://files.readme.io/5a7f231-WX20190730-1031262x.png)
1. From here, there is a section labeled **TRUFFLE PROJECTS**. Beneath this box, click the button **ADD PROJECT**. A file selection popup will appear. Navigate to the folder of your Truffle project, and select the truffle-config.js or truffle.js configuration file. The file you pick must be either named truffle-config.js or truffle.js for Ganache to correctly load it.
![add-project](https://files.readme.io/1f8be0b-WX20190730-1036252x.png)
![folder-selection](https://files.readme.io/1b8a2d3-WX20190730-1023132x.png)
1. After selecting the file, you'll see it listed in the **TRUFFLE PROJECTS** section.
![truffle-project-list](https://files.readme.io/595bc3b-WX20190730-1042102x.png)
1. After you're finished with adding projects you can click the **SAVE AND RESTART** (**SAVE WORKSPACE** if this is a new workspace) button in the top right.
![save-truffle-project](https://files.readme.io/3c13553-WX20190730-1043372x.png)
(insert screenshots that are similar to the ones on this page) https://www.trufflesuite.com/docs/ganache/truffle-projects/linking-a-truffle-project 

## 2. Why are events not shown in Ganache?
Ganache'll try to decode the events that are defined in the contracts within the corresponding Truffle project. Check and make sure you've them ready.
1. Make sure you have linked the corresponding Truffle project
![truffle-project-list](https://files.readme.io/595bc3b-WX20190730-1042102x.png)
1. Make sure the contracts are already deployed. It should have a badge named deployed right next to it. (See screenshot below)
![make-sure-deployed](https://files.readme.io/6aede26-WX20190730-1052562x.png)
1. Make sure the event is emitted in the contract's construction method. The reason is Ganache can only monitor events that has been fired on chain before. 
![make-sure-events-emitted](https://files.readme.io/a36a3d9-WX20190730-110732.png)
1. Make sure the contract's json file has the events field. The contract's json file can be found in path <truffle-project>/build/<contract-name>.json. Open the json file and search for networks. You should see "33" under the "networks" key and also "events" under the "33". (See screenshot below). If the events field is empty, run migrate --reset to re-deploy the contract. This is due to an issue within the truffle development tool https://github.com/trufflesuite/truffle/issues/2224

![make-sure-events-exist](https://files.readme.io/c276b55-WX20190730-110458.png)

