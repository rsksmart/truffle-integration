var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

function onWsConnectionFailed(error) {
  console.log('Websocket connection error: ' + error.toString());
}

function onWsConnect(connection) {
  console.log('Websocket connected');
  connection.on('error', function(error) {
      console.log("Websocket error: " + error.toString());
  });
  connection.on('close', function() {
      console.log('Websocket closed');
  });
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log("Websocket received: " + message.utf8Data);
      }
  });
  
  function makeRequest() {
      if (connection.connected) {
          const data = {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
          };
          // const data = {
          //   jsonrpc: '2.0',
          //   method: 'eth_getBlockByNumber',
          //   params: ['0x0', true], 
          //   id: 1,
          // };
          connection.sendUTF(JSON.stringify(data));
      }
  }
  makeRequest();
}

client.on('connectFailed', onWsConnectionFailed);
client.on('connect', onWsConnect);
client.connect('ws://localhost:4445/websocket');
