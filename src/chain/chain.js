#!/usr/bin/env node

var ganacheLib = require("ganache-core");
var logging = require("./logging");
var pkg = require("../../package.json");

if (!process.send) {
  console.log("Not running as child process. Throwing.");
  throw new Error("Must be run as a child process!");
}

// remove the uncaughtException listener added by ganache-cli
process.removeAllListeners("uncaughtException");

process.on("unhandledRejection", err => {
  //console.log('unhandled rejection:', err.stack || err)
  process.send({ type: "error", data: copyErrorFields(err) });
});

process.on("uncaughtException", err => {
  //console.log('uncaught exception:', err.stack || err)
  process.send({ type: "error", data: copyErrorFields(err) });
});

var server;
var blockInterval;
var dbLocation;

function stopServer(callback) {
  callback = callback || function() {};

  clearInterval(blockInterval);

  if (server) {
    server.close(callback);
  } else {
    process.send({ type: "server-stopped" });
    callback();
  }
}

function startServer(options) {
  stopServer(function() {
    let sanitizedOptions = Object.assign({}, options);
    delete sanitizedOptions.mnemonic;

    const logToFile =
      options.logDirectory !== null && typeof options.logDirectory === "string";

    if (typeof options.logger === "undefined") {
      if (logToFile) {
        logging.generateLogFilePath(options.logDirectory);

        options.logger = {
          log: message => {
            if (typeof message === "string") {
              logging.logToFile(message);
            }
          },
        };
      } else {
        // The TestRPC's logging system is archaic. We'd like more control
        // over what's logged. For now, the really important stuff all has
        // a space on the front of it. So let's only log the stuff with a
        // space on the front. ¯\_(ツ)_/¯

        options.logger = {
          log: message => {
            if (
              typeof message === "string" &&
              (options.verbose || message.indexOf(" ") == 0)
            ) {
              console.log(message);
            }
          },
        };
      }
    }

    // log startup options without logging user's mnemonic
    const startingMessage = `Starting server (version ${
      pkg.version
    }) with initial configuration: ${JSON.stringify(sanitizedOptions)}`;
    console.log(startingMessage);
    if (logToFile) {
      logging.logToFile(startingMessage);
    }

    //here we should start the server and get keys back
    let data = {};
    data.hdPath = "";
    data.mnemonic = "";
    data.privateKeys = "";
    process.send({ type: "server-started", data: data });
  });
}

function getDbLocation() {
  if (dbLocation) {
    process.send({ type: "db-location", data: dbLocation });
  } else {
    process.send({ type: "db-location", data: null });
  }
}

process.on("message", function(message) {
  //console.log("CHILD RECEIVED", message)
  switch (message.type) {
    case "start-server":
      startServer(message.data);
      break;
    case "stop-server":
      stopServer();
      break;
    case "get-db-location":
      getDbLocation();
      break;
  }
});

function copyErrorFields(e) {
  let err = Object.assign({}, e);

  // I think these properties aren't enumerable on Error objects, so we copy
  // them manually if we don't do this, they aren't passed via IPC back to the
  // main process
  err.message = e.message;
  err.stack = e.stack;
  err.name = e.name;

  return err;
}

process.send({ type: "process-started" });

// If you want to test out an error being thrown here
// setTimeout(function() {
//   throw new Error("Error from chain process!")
// }, 4000)
