'use strict';

const connectionString = 'HostName=ucl-iot-hub.azure-devices.net;DeviceId=uclBotDevice;SharedAccessKey=3VokBSqCmOfCP2gZxRUbv5sC+1dhQsN8drmiDH81ddo=';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message; 
var client = clientFromConnectionString(connectionString);

var connectCallback = function (err) {
    if (err) {
      console.error('Could not connect: ' + err);
    } else {
      console.log('Client connected to IoT Hub');
      var message = new Message('some data from my device');
      client.sendEvent(message, function (err) {
        if (err) console.log(err.toString());
      });
   
      client.on('message', function (msg) { 
        console.log(msg); 
        client.complete(msg, function () {
          console.log('completed');
        });
      }); 
    }
  };

  client.open(connectCallback);

