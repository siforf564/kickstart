const Web3 = require('web3');

let web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/5d28dc36514a48a1b023c8b1f818000b")
);

web3.eth.getStorageAt('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', 2).then(console.log)
