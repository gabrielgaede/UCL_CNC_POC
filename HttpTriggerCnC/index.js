'use strict';

const { Client } = require('azure-iothub');

const executeRemoteCommand = (deviceId, connectionString) => {
  const client = Client.fromConnectionString(connectionString);

  const methodParams = {
    methodName: 'Ping',
    payload: {},
    responseTimeoutInSeconds: 30
  };

  return new Promise((resolve, reject) => {
    client.invokeDeviceMethod(deviceId, methodParams, function(err, result) {
        if (err) {
            console.error("Direct method error: "+err.message);
        } else {
            resolve(result); 
        }
    });
  });
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        const result = await executeRemoteCommand( 'uclBotDevice', 'HostName=ucl-iot-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=JoIaQf1v8kZjJ4YmGYLSYJ7ZLIZhndBsrsY4/5U5KFw=');
        context.log(`Received response: ${result}`);
        context.res = {
            headers: {
            "Content-Type": 'application/json'
            },
            body: result
        };
        } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            headers: {
            "Content-Type": 'application/json'
            },
            body: {
            message: "Failed to execute the remote command",
            details: err.message
            }
        };
    }

};